import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/api";

function Projects() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const [creating, setCreating] = useState(false);
  const [actionError, setActionError] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  // GET all tasks
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when page loads
  useEffect(() => {
    loadTasks();
  }, []);

  // POST - Create task
  const handleCreateTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setActionError("Task title is required");
      return;
    }

    try {
      setCreating(true);
      setActionError(null);

      const newTask = await createTask({
        title,
        description,
        priority,
      });

      setTasks((currentTasks) => [...currentTasks, newTask]);

      setTitle("");
      setDescription("");
      setPriority("medium");

      setToast("Task created successfully!");

      setTimeout(() => {
        setToast(null);
      }, 3000);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setCreating(false);
    }
  };

  // PUT - Update task
  const handleToggleTask = async (task) => {
    try {
      setActionError(null);

      const updatedTask = await updateTask(task._id, {
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item._id === updatedTask._id ? updatedTask : item
        )
      );

      setToast("Task updated successfully!");

      setTimeout(() => {
        setToast(null);
      }, 3000);
    } catch (err) {
      setActionError(err.message);
    }
  };

  // DELETE - Delete task
  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionError(null);

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );

      setToast("Task deleted successfully!");

      setTimeout(() => {
        setToast(null);
      }, 3000);
    } catch (err) {
      setActionError(err.message);
    }
  };

  // Initial loading state
  if (loading) {
    return <Spinner />;
  }

  // Initial GET error
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            backgroundColor: "#198754",
            color: "white",
            borderRadius: "6px",
            zIndex: 1000,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {toast}
        </div>
      )}

      <h1>Task Manager</h1>

      {/* Create Task Form */}
      <form onSubmit={handleCreateTask}>
        <h2>Create Task</h2>

        <div>
          <label>Title</label>
          <br />

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter task description"
          />
        </div>

        <br />

        <div>
          <label>Priority</label>
          <br />

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <br />

        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create Task"}
        </button>
      </form>

      {/* Error during POST / PUT / DELETE */}
      {actionError && <ErrorMessage message={actionError} />}

      {/* Task List */}
      <div>
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <strong>{task.title}</strong>

                <p>{task.description}</p>

                <p>
                  Priority: <strong>{task.priority}</strong>
                </p>

                <p>
                  Status:{" "}
                  {task.completed ? "Completed" : "Pending"}
                </p>

                <button onClick={() => handleToggleTask(task)}>
                  {task.completed
                    ? "Mark Pending"
                    : "Mark Complete"}
                </button>

                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Projects;