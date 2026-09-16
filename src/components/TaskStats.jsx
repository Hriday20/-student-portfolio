function TaskStats({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Task Statistics</h2>

      <p>
        Total Tasks: <strong>{totalTasks}</strong>
      </p>

      <p>
        Completed: <strong>{completedTasks}</strong>
      </p>

      <p>
        Pending: <strong>{pendingTasks}</strong>
      </p>
    </div>
  );
}

export default TaskStats;