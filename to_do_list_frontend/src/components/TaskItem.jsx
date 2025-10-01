import React, { useState } from 'react';
import { formatDate } from '../lib/utils';
import TaskForm from './TaskForm';
import { useTasksActions } from '../context/TasksContext';

function askConfirm(message) {
  // use window.confirm explicitly to satisfy eslint no-restricted-globals
  return typeof window !== 'undefined' ? window.confirm(message) : true;
}

// PUBLIC_INTERFACE
export default function TaskItem({ task }) {
  /** Single task row supporting toggle complete, star, edit inline, and delete. */
  const [editing, setEditing] = useState(false);
  const actions = useTasksActions();

  const onSave = (payload) => {
    actions.updateTask(task.id, payload);
    setEditing(false);
  };

  const onDelete = () => {
    if (askConfirm('Delete this task?')) {
      actions.deleteTask(task.id);
    }
  };

  if (editing) {
    return (
      <div className="list-item">
        <div />
        <div>
          <TaskForm initial={task} onSubmit={onSave} onCancel={() => setEditing(false)} />
        </div>
        <div />
      </div>
    );
  }

  return (
    <div className="list-item" role="listitem" aria-label={`Task ${task.title}`}>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.status === 'Done'}
        onChange={() => actions.toggleStatus(task.id)}
        aria-label={task.status === 'Done' ? 'Mark as not complete' : 'Mark as complete'}
      />
      <div>
        <div className="item-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <span className={`status ${task.status === 'Todo' ? 'todo' : task.status === 'In Progress' ? 'progress' : 'done'}`}>
            {task.status}
          </span>
          <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
          {task.starred && (
            <span className="pill" style={{ color: 'var(--color-secondary)', borderColor: '#fde68a', background: '#fffbeb' }}>
              ★ Starred
            </span>
          )}
        </div>
        <div className="item-meta">
          {task.description && <span>{task.description}</span>}
          {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}
          {task.tags && task.tags.map((t) => (
            <span className="tag" key={t}>#{t}</span>
          ))}
        </div>
      </div>
      <div className="item-actions">
        <button className="btn btn-ghost" onClick={() => actions.toggleStar(task.id)} aria-label={task.starred ? 'Unstar task' : 'Star task'}>
          {task.starred ? '★' : '☆'}
        </button>
        <button className="btn btn-ghost" onClick={() => setEditing(true)} aria-label="Edit task">Edit</button>
        <button className="btn btn-danger" onClick={onDelete} aria-label="Delete task">Delete</button>
      </div>
    </div>
  );
}
