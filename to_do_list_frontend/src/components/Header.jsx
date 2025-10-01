import React from 'react';
import { FiCheckSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { theme, focusRingStyle, buttonVariants } from '../theme';

// PUBLIC_INTERFACE
export default function Header({ search, onSearchChange, onAddClick }) {
  /** App header with brand, search input and Add Task button. */
  return (
    <header
      className="header"
      aria-label="Application header"
      style={{ background: theme.gradients.headerAccent }}
    >
      <div className="header-inner container">
        <div className="brand" aria-label="Brand" style={{ gap: 12 }}>
          <div
            className="logo"
            aria-hidden="true"
            style={{ background: theme.gradients.brandTile }}
          />
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <FiCheckSquare
                aria-hidden="true"
                color={theme.primary}
                style={{ filter: 'drop-shadow(0 1px 4px rgba(37,99,235,0.25))' }}
              />
              Ocean Tasks
            </h1>
            <small style={{ color: theme.muted }}>Personal to-do organizer</small>
          </div>
        </div>
        <div className="search" role="search" aria-label="Task search">
          <div style={{ position: 'relative', flex: 1 }}>
            <FiSearch
              aria-hidden="true"
              size={18}
              color={theme.muted}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              aria-label="Search tasks"
              className="input"
              placeholder="Search tasks (title, description)..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ paddingLeft: 34 }}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.outline = '';
              }}
            />
          </div>
          <button
            className="btn"
            onClick={onAddClick}
            aria-label="Add new task"
            title="Add new task"
            style={buttonVariants('primary')}
            onFocus={(e) => (e.currentTarget.style.boxShadow = `${theme.ring}, ${theme.shadow.md}`)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = theme.shadow.md)}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <FiPlus aria-hidden="true" />
              Add Task
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
