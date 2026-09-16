# Practical 8 — Performance Optimization and Lazy Loading in React

## Objective

Improve the performance of the React application using route-based lazy loading and code splitting.

---

## 1. Lazy Loading Implementation

React's `lazy()` and `Suspense` were used to load components only when they are required.

### Route-based lazy loading

The following pages are lazy-loaded:

- Projects
- Contact

Example:

```jsx
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));