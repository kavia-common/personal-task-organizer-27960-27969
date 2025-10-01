import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { loadTasks, saveTasks } from '../lib/storage';
import { uuid } from '../lib/utils';

const TasksStateContext = createContext();
const TasksDispatchContext = createContext();

const initialSeed = [
  {
    id: uuid(),
    title: 'Welcome to Ocean Tasks',
    description: 'Use the form to add tasks. Try filters, priorities, and starring.',
    dueDate: '',
    priority: 'Medium',
    status: 'Todo',
    tags: ['welcome', 'tips'],
    starred: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Plan your week',
    description: 'Add tasks and set due dates to plan effectively.',
    dueDate: '',
    priority: 'High',
    status: 'In Progress',
    tags: ['planning'],
    starred: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const now = new Date().toISOString();
      const task = {
        ...action.payload,
        id: uuid(),
        createdAt: now,
        updatedAt: now
      };
      return [task, ...state];
    }
    case 'UPDATE_TASK': {
      const { id, updates } = action.payload;
      return state.map(t => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
    }
    case 'DELETE_TASK': {
      const { id } = action.payload;
      return state.filter(t => t.id !== id);
    }
    case 'TOGGLE_STATUS': {
      const { id } = action.payload;
      return state.map(t => {
        if (t.id !== id) return t;
        const next =
          t.status === 'Todo' ? 'In Progress' :
          t.status === 'In Progress' ? 'Done' : 'Todo';
        return { ...t, status: next, updatedAt: new Date().toISOString() };
      });
    }
    case 'TOGGLE_STAR': {
      const { id } = action.payload;
      return state.map(t => (t.id === id ? { ...t, starred: !t.starred, updatedAt: new Date().toISOString() } : t));
    }
    case 'BULK_UPDATE': {
      const { updater } = action.payload; // function(task) -> task
      return state.map(t => updater(t));
    }
    case 'HYDRATE': {
      return action.payload;
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function TasksProvider({ children }) {
  /**
   * Provides tasks state and actions via React context.
   * Persists to localStorage and seeds initial data if storage is empty.
   */
  const [state, dispatch] = useReducer(reducer, []);

  // hydrate once
  useEffect(() => {
    const stored = loadTasks();
    if (stored && Array.isArray(stored)) {
      dispatch({ type: 'HYDRATE', payload: stored });
    } else {
      dispatch({ type: 'HYDRATE', payload: initialSeed });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist whenever state changes
  useEffect(() => {
    if (state && Array.isArray(state)) {
      saveTasks(state);
    }
  }, [state]);

  const value = useMemo(() => state, [state]);
  const actions = useMemo(() => ({
    // PUBLIC_INTERFACE
    addTask(payload) { dispatch({ type: 'ADD_TASK', payload }); },
    // PUBLIC_INTERFACE
    updateTask(id, updates) { dispatch({ type: 'UPDATE_TASK', payload: { id, updates } }); },
    // PUBLIC_INTERFACE
    deleteTask(id) { dispatch({ type: 'DELETE_TASK', payload: { id } }); },
    // PUBLIC_INTERFACE
    toggleStatus(id) { dispatch({ type: 'TOGGLE_STATUS', payload: { id } }); },
    // PUBLIC_INTERFACE
    toggleStar(id) { dispatch({ type: 'TOGGLE_STAR', payload: { id } }); },
    // PUBLIC_INTERFACE
    bulkUpdate(updater) { dispatch({ type: 'BULK_UPDATE', payload: { updater } }); }
  }), []);

  return (
    <TasksStateContext.Provider value={value}>
      <TasksDispatchContext.Provider value={actions}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTasks() {
  /** Returns tasks array from context. */
  const ctx = useContext(TasksStateContext);
  if (ctx === undefined) throw new Error('useTasks must be used within TasksProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useTasksActions() {
  /** Returns actions for mutating tasks. */
  const ctx = useContext(TasksDispatchContext);
  if (ctx === undefined) throw new Error('useTasksActions must be used within TasksProvider');
  return ctx;
}
