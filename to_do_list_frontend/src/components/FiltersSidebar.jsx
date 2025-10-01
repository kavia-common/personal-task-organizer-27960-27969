import React from 'react';
import { parseTags } from '../lib/utils';

// PUBLIC_INTERFACE
export default function FiltersSidebar({ filters, setFilters }) {
  /** Sidebar filters for status, priority, starred, and tags. */
  const onChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  return (
    <aside className="sidebar card" aria-label="Filters">
      <div className="section">
        <h4>Status</h4>
        <select value={filters.status} onChange={e => onChange('status', e.target.value)} aria-label="Status filter">
          <option>All</option>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      <div className="section">
        <h4>Priority</h4>
        <select value={filters.priority} onChange={e => onChange('priority', e.target.value)} aria-label="Priority filter">
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <div className="section">
        <h4>Starred</h4>
        <select
          value={String(filters.starred)}
          onChange={e => onChange('starred', e.target.value === 'null' ? null : e.target.value === 'true')}
          aria-label="Starred filter"
        >
          <option value="null">All</option>
          <option value="true">Starred</option>
          <option value="false">Not starred</option>
        </select>
      </div>
      <div className="section">
        <h4>Tags</h4>
        <input
          className="input"
          placeholder="comma,separated,tags"
          value={filters.tagsInput || ''}
          onChange={e => {
            const tagsInput = e.target.value;
            onChange('tagsInput', tagsInput);
            onChange('tags', parseTags(tagsInput));
          }}
          aria-label="Tags filter"
        />
      </div>
      <button
        className="btn btn-ghost"
        onClick={() => setFilters({ status: 'All', priority: 'All', starred: null, search: '', tags: [], tagsInput: '', sortBy: 'createdAt' })}
        aria-label="Clear filters"
      >
        Clear Filters
      </button>
    </aside>
  );
}
