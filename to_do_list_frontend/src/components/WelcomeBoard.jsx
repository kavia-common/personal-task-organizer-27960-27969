import React, { useEffect, useMemo, useState } from 'react';
import { FiCommand, FiPlusCircle, FiSearch, FiSliders, FiStar, FiX } from 'react-icons/fi';
import { theme, buttonVariants } from '../theme';

const STORAGE_KEY = 'ui.welcomeBoard.dismissed';

// PUBLIC_INTERFACE
export default function WelcomeBoard({ onCreateFirstTask, tasksCount }) {
  /**
   * Inline welcome section rendered within main content above the task list.
   * - Shows friendly greeting, quick tips, and a CTA to create the first task.
   * - Dismissible; persists in localStorage and auto-hides when tasks exist.
   *
   * Props:
   * - onCreateFirstTask: () => void; handler to reveal the TaskForm and focus input.
   * - tasksCount: number; used to auto-hide once > 0.
   */
  const [dismissed, setDismissed] = useState(false);

  // Hydrate dismissed state from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setDismissed(raw === 'true');
    } catch {
      // no-op
    }
  }, []);

  // Auto-hide once tasks exist
  const shouldHide = useMemo(() => {
    if (typeof tasksCount === 'number' && tasksCount > 0) return true;
    return dismissed;
  }, [tasksCount, dismissed]);

  const doDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore write error
    }
  };

  if (shouldHide) return null;

  return (
    <section
      className="card"
      aria-label="Welcome board"
      style={{
        padding: 16,
        background: theme.gradients.subtleCard,
        border: '1px solid rgba(37,99,235,0.15)',
        boxShadow: `${theme.shadow.md}`,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              aria-hidden="true"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: theme.gradients.brandTile,
                boxShadow: theme.shadow.md,
              }}
            />
            Welcome to Ocean Tasks
          </h2>
          <p style={{ margin: 0, color: theme.muted }}>
            Organize your day with tasks, priorities, and filters. Get started in seconds.
          </p>

          <ul
            style={{
              margin: '8px 0 0 0',
              padding: 0,
              listStyle: 'none',
              display: 'grid',
              gap: 6,
            }}
          >
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiPlusCircle aria-hidden="true" color={theme.primary} />
              Click “Add Task” or use the button below to create your first item.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiSearch aria-hidden="true" color={theme.primary} />
              Use the search in the header to quickly find tasks.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiSliders aria-hidden="true" color={theme.primary} />
              Filter by status, priority, starred, and tags in the sidebar.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiStar aria-hidden="true" color={theme.secondary} />
              Star important items to keep them top of mind.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiCommand aria-hidden="true" color={theme.muted} />
              Tip: Press Tab to move between fields while adding tasks.
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <button
              className="btn"
              onClick={onCreateFirstTask}
              aria-label="Create your first task"
              style={buttonVariants('primary')}
              onFocus={(e) => (e.currentTarget.style.boxShadow = `${theme.ring}, ${theme.shadow.md}`)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = theme.shadow.md)}
            >
              Create your first task
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={doDismiss}
              aria-label="Hide welcome"
              title="Hide"
              style={{
                ...buttonVariants('ghost'),
                padding: '8px 10px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = theme.alpha.primary10)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FiX aria-hidden="true" />
                Hide
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
