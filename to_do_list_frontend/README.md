# Ocean Tasks — React To‑Do List

Modern, responsive personal to‑do list SPA with local persistence and an Ocean Professional theme.

## Tech
- React 18 (CRA)
- Functional components, hooks, Context + useReducer
- CSS modules via handcrafted theme.css (no external UI libs)
- localStorage persistence (abstracted)

## Run
- Install: `npm install`
- Start: `npm start` (dev server on http://localhost:3000)
- Build: `npm run build`

## Features
- Add, edit (inline), delete with confirmation
- Fields: title, description, due date, priority (Low/Medium/High), status (Todo/In Progress/Done), tags, starred
- Filters: status, priority, starred, search, tags
- Sorting: created date, due date, priority, status
- Local storage persistence with initial seed
- Empty state and loading shimmers
- Responsive layout with collapsible behavior

## Project Structure
- src/styles/theme.css — Ocean Professional theme and base UI
- src/context/TasksContext.jsx — reducer, actions, persistence
- src/components/ — Header, TaskForm, TaskItem, TaskList, FiltersSidebar
- src/lib/storage.js — localStorage abstraction
- src/lib/utils.js — helpers: uuid, sorting, filtering, formatting
- src/App.jsx — app shell and wiring

## Data Model
```
{
  id: string,
  title: string,
  description?: string,
  dueDate?: string (ISO),
  priority: 'Low'|'Medium'|'High',
  status: 'Todo'|'In Progress'|'Done',
  tags: string[],
  starred: boolean,
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

## Notes
- The data layer is abstracted (src/lib/storage.js, TasksContext) to allow swapping to HTTP later.
- Accessibility: semantic elements, aria labels, focus rings.
- Dev server uses CRA defaults. To change port, set PORT in an .env file (see .env.example).
- Dev server uses CRA defaults. To change port, set PORT in an .env file (see .env.example).

