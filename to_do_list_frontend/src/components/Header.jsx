import React from 'react';
import { FiCheckSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { theme, focusRingStyle, buttonVariants } from '../theme';

// PUBLIC_INTERFACE
export default function Header({ search, onSearchChange, onAddClick }) {
  /** App header with brand, search input and Add Task button. */
  const headerStyle = {
    background: theme.header?.bg || theme.gradients.headerAccent,
    borderBottom: `1px solid ${theme.header?.border || 'rgba(17,24,39,0.06)'}`,
    boxShadow: theme.header?.shadow || '0 2px 12px rgba(0,0,0,0.04)',
    color: theme.header?.text || undefined,
  };

  const brandTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    margin: 0,
    color: theme.header?.text || undefined,
  };

  const subtitleStyle = {
    color: theme.header?.text ? 'rgba(255,255,255,0.85)' : theme.muted,
  };

  const iconColor = theme.header?.icon || 'currentColor';

  return (
    <header
      className="header"
      aria-label="Application header"
      style={headerStyle}
    >
      <div className="header-inner container" style={{ color: theme.header?.text || undefined }}>
        <div className="brand" aria-label="Brand" style={{ gap: 12 }}>
          <div
            className="logo"
            aria-hidden="true"
            style={{
              background: theme.gradients.brandTile,
              boxShadow: theme.shadow.md,
              border: theme.header?.border ? `1px solid ${theme.header.border}` : undefined,
            }}
          />
          <div>
            <h1 style={brandTitleStyle}>
              <FiCheckSquare
                aria-hidden="true"
                color={iconColor}
                style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.25))' }}
              />
              Ocean Tasks
            </h1>
            <small style={subtitleStyle}>Personal to-do organizer</small>
          </div>
        </div>
        <div className="search" role="search" aria-label="Task search">
          <div style={{ position: 'relative', flex: 1 }}>
            <FiSearch
              aria-hidden="true"
              size={18}
              color={theme.header?.text ? 'rgba(255,255,255,0.8)' : theme.muted}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              aria-label="Search tasks"
              className="input"
              placeholder="Search tasks (title, description)..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                paddingLeft: 34,
                // On dark header, lighten input bg for contrast
                background: theme.header?.text ? 'rgba(255,255,255,0.95)' : undefined,
              }}
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
            onMouseEnter={(e) => {
              // subtle overlay hover when inside dark header
              if (theme.header?.text) e.currentTarget.style.background = '#1D4ED8';
            }}
            onMouseLeave={(e) => {
              if (theme.header?.text) e.currentTarget.style.background = theme.primary;
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <FiPlus aria-hidden="true" color={theme.header?.text ? '#FFFFFF' : undefined} />
              Add Task
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
