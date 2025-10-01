import React, { useEffect, useState } from 'react';
import { parseTags } from '../lib/utils';

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
export default function TaskForm({ onSubmit, onCancel, initial }) {
  /** Add/Edit task form with validation. */
  const [task, setTask] = useState(defaultTask);
  const [tagsInput, setTagsInput] = useState('');
  const [errors, setErrors] = useState({});

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
    if (!validate()) return;
    const payload = { ...task, tags: parseTags(tagsInput) };
    onSubmit(payload);
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
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="e.g., Prepare project brief"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              required
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
            />
          </div>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <div>
            <label htmlFor="priority">Priority</label>
            <select id="priority" value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
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
          />
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button type="submit" className="btn" aria-label={initial ? 'Save changes' : 'Add task'}>
            {initial ? 'Save' : 'Add Task'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onCancel} aria-label="Cancel">
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
}
