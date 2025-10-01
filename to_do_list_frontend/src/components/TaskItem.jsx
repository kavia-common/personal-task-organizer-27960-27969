import React, { useState } from 'react';
import { formatDate } from '../lib/utils';
import TaskForm from './TaskForm';
import { useTasksActions } from '../context/TasksContext';
import { FiCheckCircle, FiCircle, FiEdit3, FiTrash2, FiStar } from 'react-icons/fi';
import { theme, buttonVariants, badgeVariant } from '../theme';

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

  const isDone = task.status === 'Done';

  return (
    <div className="list-item" role="listitem" aria-label={`Task ${task.title}`}>
      <button
        type="button"
        aria-label={isDone ? 'Mark as not complete' : 'Mark as complete'}
        onClick={() => actions.toggleStatus(task.id)}
        className="btn btn-ghost"
        style={{
          ...buttonVariants('ghost'),
          padding: 6,
          borderRadius: 999,
          borderColor: isDone ? 'rgba(16,185,129,0.4)' : 'rgba(37,99,235,0.35)',
          color: isDone ? '#059669' : theme.primary,
          background: isDone ? 'rgba(16,185,129,0.08)' : 'transparent',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = isDone ? 'rgba(16,185,129,0.12)' : theme.alpha.primary10)}
        onMouseLeave={(e) => (e.currentTarget.style.background = isDone ? 'rgba(16,185,129,0.08)' : 'transparent')}
      >
        {isDone ? <FiCheckCircle aria-hidden="true" /> : <FiCircle aria-hidden="true" />}
      </button>

      <div>
        <div className="item-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <span
            className={`status ${task.status === 'Todo' ? 'todo' : task.status === 'In Progress' ? 'progress' : 'done'}`}
            style={badgeVariant(task.status === 'Todo' ? 'todo' : task.status === 'In Progress' ? 'progress' : 'done')}
          >
            {task.status}
          </span>
          <span
            className={`pill ${task.priority.toLowerCase()}`}
            style={badgeVariant(task.priority.toLowerCase())}
          >
            {task.priority}
          </span>
          {task.starred && (
            <span
              className="pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: theme.secondaryDark,
                borderColor: '#fde68a',
                background: '#fffbeb',
                padding: '2px 8px',
                borderRadius: 999,
                fontSize: 12,
                border: '1px solid #fde68a',
              }}
            >
              <FiStar aria-hidden="true" />
              Starred
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
        <button
          className="btn btn-ghost"
          onClick={() => actions.toggleStar(task.id)}
          aria-label={task.starred ? 'Unstar task' : 'Star task'}
          title={task.starred ? 'Unstar' : 'Star'}
          style={{ ...buttonVariants('ghost'), padding: '8px 10px' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = theme.alpha.secondary12)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <FiStar aria-hidden="true" color={task.starred ? theme.secondary : theme.primary} />
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => setEditing(true)}
          aria-label="Edit task"
          title="Edit"
          style={{ ...buttonVariants('ghost'), padding: '8px 10px' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = theme.alpha.primary15)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <FiEdit3 aria-hidden="true" />
        </button>
        <button
          className="btn btn-danger"
          onClick={onDelete}
          aria-label="Delete task"
          title="Delete"
          style={buttonVariants('danger')}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.92)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          <FiTrash2 aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
