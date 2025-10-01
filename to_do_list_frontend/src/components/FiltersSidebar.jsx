import React from 'react';
import { parseTags } from '../lib/utils';
import { FiSliders, FiSearch } from 'react-icons/fi';
import { theme, buttonVariants, focusRingStyle, badgeVariant } from '../theme';

// PUBLIC_INTERFACE
export default function FiltersSidebar({ filters, setFilters }) {
  /** Sidebar filters for status, priority, starred, and tags. */
  const onChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const clearAll = () =>
    setFilters({ status: 'All', priority: 'All', starred: null, search: '', tags: [], tagsInput: '', sortBy: 'createdAt' });

  return (
    <aside className="sidebar card" aria-label="Filters">
      <div className="section" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <FiSliders aria-hidden="true" color={theme.primary} />
        <h4 style={{ margin: 0 }}>Filters</h4>
      </div>

      <div className="section">
        <h4>Status</h4>
        <select
          value={filters.status}
          onChange={e => onChange('status', e.target.value)}
          aria-label="Status filter"
          onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '';
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.outline = '';
          }}
        >
          <option>All</option>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <div className="section">
        <h4>Priority</h4>
        <select
          value={filters.priority}
          onChange={e => onChange('priority', e.target.value)}
          aria-label="Priority filter"
          onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '';
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.outline = '';
          }}
        >
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
          onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '';
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.outline = '';
          }}
        >
          <option value="null">All</option>
          <option value="true">Starred</option>
          <option value="false">Not starred</option>
        </select>
      </div>

      <div className="section">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <FiSearch aria-hidden="true" />
          Tags
        </h4>
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
          onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '';
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.outline = '';
          }}
        />
        {filters.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
            {filters.tags.map((t) => (
              <span key={t} className="tag" style={{ ...badgeVariant('progress') }}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        className="btn btn-ghost"
        onClick={clearAll}
        aria-label="Clear filters"
        title="Clear all filters"
        style={buttonVariants('ghost')}
        onFocus={(e) => (e.currentTarget.style.boxShadow = `${theme.ring}`)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
      >
        Clear Filters
      </button>
    </aside>
  );
}
