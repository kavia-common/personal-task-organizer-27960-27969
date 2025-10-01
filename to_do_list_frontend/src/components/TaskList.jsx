import React from 'react';
import TaskItem from './TaskItem';
import { sortTasks } from '../lib/utils';
import WelcomeCard from './WelcomeCard';
import { FiCheckSquare } from 'react-icons/fi';
import { theme, focusRingStyle } from '../theme';

// PUBLIC_INTERFACE
export default function TaskList({ tasks, sortBy, setSortBy, loading, onGetStarted }) {
  /** List of tasks with sorting controls and loading placeholders. Renders a WelcomeCard when empty. */
  const sorted = sortTasks(tasks, sortBy);

  return (
    <section className="card" style={{ padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FiCheckSquare aria-hidden="true" color={theme.primary} />
          Tasks
        </h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--color-muted)' }}>Sort by</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="select"
            aria-label="Sort tasks"
            onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.outline = '';
            }}
          >
            <option value="createdAt">Created date</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="list" role="status" aria-live="polite" aria-busy="true">
          <div className="shimmer" style={{ height: 64 }} />
          <div className="shimmer" style={{ height: 64 }} />
          <div className="shimmer" style={{ height: 64 }} />
        </div>
      ) : sorted.length === 0 ? (
        <WelcomeCard onGetStarted={onGetStarted} />
      ) : (
        <div className="list" role="list" aria-label="Task list">
          {sorted.map(task => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
      )}
    </section>
  );
}
