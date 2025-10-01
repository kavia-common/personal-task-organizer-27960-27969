import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { parseTags } from '../lib/utils';
import { FiPlus, FiSave } from 'react-icons/fi';
import { theme, buttonVariants, focusRingStyle } from '../theme';

const defaultTask = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  status: 'Todo',
  tags: [],
  starred: false
};

// PUBLIC_INTERFACE
const TaskForm = forwardRef(function TaskForm({ onSubmit, onCancel, initial }, ref) {
  /** Add/Edit task form with validation and an exposed focusInput() method via ref. */
  const [task, setTask] = useState(defaultTask);
  const [tagsInput, setTagsInput] = useState('');
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // PUBLIC_INTERFACE
    focusInput() {
      /** Imperatively focus the title input. */
      if (titleRef.current) {
        titleRef.current.focus();
      }
    }
  }));

  useEffect(() => {
    if (initial) {
      setTask({
        title: initial.title || '',
        description: initial.description || '',
        dueDate: initial.dueDate || '',
        priority: initial.priority || 'Medium',
        status: initial.status || 'Todo',
        tags: initial.tags || [],
        starred: !!initial.starred
      });
      setTagsInput((initial.tags || []).join(', '));
    }
  }, [initial]);

  const validate = () => {
    const errs = {};
    if (!task.title.trim()) errs.title = 'Title is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      // focus the title for quick correction
      if (titleRef.current) titleRef.current.focus();
      return;
    }
    const payload = { ...task, tags: parseTags(tagsInput) };
    onSubmit(payload);
    // After submit, clear and refocus for fast entry
    setTask(defaultTask);
    setTagsInput('');
    setTimeout(() => titleRef.current && titleRef.current.focus(), 0);
  };

  return (
    <form className="card" style={{ padding: 12 }} onSubmit={handleSubmit} aria-label="Task form">
      <fieldset>
        <legend>{initial ? 'Edit Task' : 'Add Task'}</legend>
        <div className="row">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="input"
              ref={titleRef}
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="e.g., Prepare project brief"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              required
              onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.outline = '';
              }}
            />
            {errors.title && <div id="title-error" style={{ color: 'var(--color-error)', fontSize: 12 }}>{errors.title}</div>}
          </div>
          <div>
            <label htmlFor="due">Due date</label>
            <input
              id="due"
              className="input"
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.outline = '';
              }}
            />
          </div>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <div>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.outline = '';
              }}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.outline = '';
              }}
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div>
            <label htmlFor="star">Starred</label>
            <select
              id="star"
              value={String(task.starred)}
              onChange={(e) => setTask({ ...task, starred: e.target.value === 'true' })}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.outline = '';
              }}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            className="input"
            rows={3}
            placeholder="Add more details..."
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.outline = '';
            }}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            className="input"
            placeholder="comma, separated, tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusRingStyle())}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.outline = '';
            }}
          />
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button
            type="submit"
            className="btn"
            aria-label={initial ? 'Save changes' : 'Add task'}
            style={buttonVariants('primary')}
            onFocus={(e) => (e.currentTarget.style.boxShadow = `${theme.ring}, ${theme.shadow.md}`)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = theme.shadow.md)}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {initial ? <FiSave aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
              {initial ? 'Save' : 'Add Task'}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            aria-label="Cancel"
            style={buttonVariants('ghost')}
            onFocus={(e) => (e.currentTarget.style.boxShadow = `${theme.ring}`)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
});

export default TaskForm;
