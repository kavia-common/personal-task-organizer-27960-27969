import React from 'react';
import TaskItem from './TaskItem';
import { sortTasks } from '../lib/utils';

// PUBLIC_INTERFACE
export default function TaskList({ tasks, sortBy, setSortBy, loading }) {
  /** List of tasks with sorting controls and loading placeholders. */
  const sorted = sortTasks(tasks, sortBy);

  return (
    <section className="card" style={{ padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <h3 style={{ margin: 0 }}>Tasks</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--color-muted)' }}>Sort by</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="select" aria-label="Sort tasks">
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
        <div className="empty">No tasks match the current filters.</div>
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
