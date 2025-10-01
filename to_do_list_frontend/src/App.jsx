import React, { useEffect, useMemo, useState } from 'react';
import './styles/theme.css';
import Header from './components/Header';
import FiltersSidebar from './components/FiltersSidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TasksProvider, useTasks, useTasksActions } from './context/TasksContext';
import { filterTasks } from './lib/utils';

function AppInner() {
  const tasks = useTasks();
  const actions = useTasksActions();

  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    starred: null,
    search: '',
    tags: [],
    tagsInput: '',
    sortBy: 'createdAt'
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // simulate short loading during initial hydration
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const visibleTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  const handleAdd = (payload) => {
    actions.addTask(payload);
    setShowForm(false);
  };

  return (
    <div>
      <Header
        search={filters.search}
        onSearchChange={(v) => setFilters(f => ({ ...f, search: v }))}
        onAddClick={() => setShowForm(true)}
      />
      <main className="container main app-shell">
        <FiltersSidebar filters={filters} setFilters={setFilters} />
        <div style={{ display: 'grid', gap: 12 }}>
          {showForm && <TaskForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />}
          <TaskList
            tasks={visibleTasks}
            sortBy={filters.sortBy}
            setSortBy={(v) => setFilters(f => ({ ...f, sortBy: v }))}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root component providing context and rendering the application shell. */
  return (
    <TasksProvider>
      <AppInner />
    </TasksProvider>
  );
}
