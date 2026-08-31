const BASE_URL = "http://localhost:5003";

// Get JWT token from browser storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Create headers for authenticated requests
const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

// Handle API responses consistently
const handleResponse = async (response) => {
  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  // JWT missing, invalid, or expired
  if (response.status === 401) {
    localStorage.removeItem("token");

    window.location.href = "/login";

    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    const error = new Error(
      data.message ||
        data.details?.join(", ") ||
        data.error ||
        "Something went wrong"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

// =========================
// AUTHENTICATION
// =========================

// Register
export const registerUser = async (user) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(response);
};

// Login
export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response);

  // Store JWT after successful login
  localStorage.setItem("token", data.token);

  return data;
};

// Get currently logged-in user
export const getCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// =========================
// TASKS
// =========================

// Get all tasks
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

// Create task
export const createTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });

  return handleResponse(response);
};

// Update task
export const updateTask = async (id, task) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });

  return handleResponse(response);
};

// Delete task
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};