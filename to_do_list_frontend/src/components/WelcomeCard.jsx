import React, { useEffect, useRef, useState } from 'react';

/**
 * WelcomeCard - a reusable empty/intro state card with Ocean Professional styling.
 * - Renders a full card by default, or a compact banner when variant="compact".
 * - Accessible: role="status", aria-live="polite", keyboard focusable.
 * - Primary CTA triggers onGetStarted (e.g., focus the add-task input).
 */
// PUBLIC_INTERFACE
export default function WelcomeCard({
  onGetStarted,
  onSecondary,
  variant = 'full',
  className = '',
}) {
  /** Accessible welcome/empty-state component with subtle entrance animation. */
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // trigger enter animation after mount
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const baseStyles = {
    borderRadius: 12,
    border: '1px solid rgba(17,24,39,0.08)',
    boxShadow: 'var(--shadow-md)',
    background:
      'linear-gradient(180deg, rgba(37, 99, 235, 0.10) 0%, rgba(249, 250, 251, 1) 70%)',
    color: 'var(--color-text)',
    transition: 'opacity .5s ease, transform .5s ease, box-shadow .2s ease',
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(6px)',
    outline: 'none',
  };

  const fullStyles = {
    padding: 18,
    display: 'grid',
    gap: 10,
    alignItems: 'center',
    textAlign: 'center',
  };

  const compactStyles = {
    padding: 12,
    display: 'grid',
    gap: 8,
    alignItems: 'center',
  };

  const isCompact = variant === 'compact';

  return (
    <section
      ref={sectionRef}
      role="status"
      aria-live="polite"
      tabIndex={0}
      className={`card welcome-card ${className}`}
      style={{ ...baseStyles, ...(isCompact ? compactStyles : fullStyles) }}
      aria-label={isCompact ? 'Tips banner' : 'Welcome to Ocean Tasks'}
      onFocus={(e) => {
        // subtle elevation on focus
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      <div
        className="icon"
        aria-hidden="true"
        style={{
          fontSize: isCompact ? 18 : 32,
          width: 'fit-content',
          margin: isCompact ? 0 : '0 auto',
          filter: 'drop-shadow(0 2px 6px rgba(37,99,235,0.25))',
        }}
      >
        📝
      </div>
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: isCompact ? 16 : 20,
            color: 'var(--color-text)',
          }}
        >
          {isCompact ? 'Stay organized' : 'Welcome to Your Task Organizer'}
        </h2>
        <p
          style={{
            margin: '6px 0 0',
            color: 'var(--color-muted)',
            fontSize: isCompact ? 13 : 14,
          }}
        >
          {isCompact
            ? 'Add tasks, set priorities, and keep momentum.'
            : 'Capture tasks, set priorities, and stay on track. Let’s add your first task.'}
        </p>
      </div>

      <div
        className="actions"
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: isCompact ? 'start' : 'center',
          flexWrap: 'wrap',
          marginTop: 4,
        }}
      >
        <button
          type="button"
          className="btn"
          aria-label="Add your first task"
          onClick={onGetStarted}
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: isCompact ? '6px 10px' : '10px 14px',
          }}
        >
          {isCompact ? 'Add task' : 'Add your first task'}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          aria-label="Learn productivity tips"
          onClick={
            onSecondary ||
            (() => {
              if (typeof window !== 'undefined') {
                window.open(
                  'https://www.notion.so/productivity',
                  '_blank',
                  'noopener,noreferrer'
                );
              }
            })
          }
          style={{
            borderColor: 'rgba(245, 158, 11, 0.35)',
            color: 'var(--color-secondary)',
            padding: isCompact ? '6px 10px' : '10px 14px',
          }}
        >
          Learn tips
        </button>
      </div>
    </section>
  );
}
