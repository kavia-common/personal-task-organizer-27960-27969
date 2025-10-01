import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ search, onSearchChange, onAddClick }) {
  /** App header with brand, search input and Add Task button. */
  return (
    <header className="header" aria-label="Application header">
      <div className="header-inner container">
        <div className="brand" aria-label="Brand">
          <div className="logo" aria-hidden="true" />
          <div>
            <h1>Ocean Tasks</h1>
            <small>Personal to-do organizer</small>
          </div>
        </div>
        <div className="search" role="search">
          <input
            aria-label="Search tasks"
            className="input"
            placeholder="Search tasks (title, description)..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="btn" onClick={onAddClick} aria-label="Add new task">
            + Add Task
          </button>
        </div>
      </div>
    </header>
  );
}
