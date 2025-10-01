import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles/theme.css';
import Header from './components/Header';
import FiltersSidebar from './components/FiltersSidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import WelcomeCard from './components/WelcomeCard';
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

  // Track if user dismissed the welcome overlay manually.
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);

  const formRef = useRef(null);
  const ctaRef = useRef(null);

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

  const revealFormAndFocus = () => {
    // Only controls the form visibility and focuses input.
    setShowForm(true);
    // allow form to render before focusing
    setTimeout(() => {
      if (formRef.current && typeof formRef.current.focusInput === 'function') {
        formRef.current.focusInput();
      }
    }, 0);
  };

  const hasAnyTask = (tasks || []).length > 0;
  const showWelcome = !hasAnyTask && !welcomeDismissed;

  return (
    <div>
      <Header
        search={filters.search}
        onSearchChange={(v) => setFilters(f => ({ ...f, search: v }))}
        onAddClick={revealFormAndFocus}
      />
      <main className="container main app-shell">
        <FiltersSidebar filters={filters} setFilters={setFilters} />
        <div style={{ display: 'grid', gap: 12, position: 'relative' }}>
          {/* When there ARE tasks, show a compact banner near the top (optional). */}
          {hasAnyTask && !showForm && (
            <WelcomeCard
              variant="compact"
              onGetStarted={revealFormAndFocus}
            />
          )}

          {showForm && (
            <TaskForm
              ref={formRef}
              onSubmit={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          )}

          <TaskList
            tasks={visibleTasks}
            sortBy={filters.sortBy}
            setSortBy={(v) => setFilters(f => ({ ...f, sortBy: v }))}
            loading={loading}
          />

          {/* Overlay: visible until any task exists or user dismisses. */}
          {showWelcome && (
            <div
              aria-hidden="true"
              role="presentation"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(17,24,39,0.25)',
                zIndex: 50,
                pointerEvents: 'none' // make backdrop non-blocking
              }}
            />
          )}

          {showWelcome && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                zIndex: 60,
                pointerEvents: 'none' // container non-blocking; buttons below will re-enable
              }}
              aria-live="polite"
            >
              <div style={{ pointerEvents: 'auto' }}>
                <WelcomeCard
                  onGetStarted={revealFormAndFocus}
                  onSecondary={null}
                  variant="full"
                  className="welcome-overlay"
                  // Provide dismiss to allow manual hide; do not auto-hide on CTA.
                  dismissible
                  onDismiss={() => {
                    setWelcomeDismissed(true);
                    // Return focus smartly: prefer form input if form open.
                    setTimeout(() => {
                      if (formRef.current && typeof formRef.current.focusInput === 'function') {
                        formRef.current.focusInput();
                      }
                    }, 0);
                  }}
                />
              </div>
            </div>
          )}
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
