import axios from "axios";

export const signupMutation = async (formData) => {
  try {
    const response = await axios.post(
      "https://www.varicon.nextify.dev/api/auth/register",
      formData
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//Login
export const loginMutation = async (formData) => {
  console.log("Login form data:", formData);
  try {
    const response = await axios.post(
      "https://www.varicon.nextify.dev/api/auth/login",
      formData
    );
    return response.data; // Return response data if successful
  } catch (error) {
    console.log(error);
  }
};

//add todo
export const addTodoFn = async (newTodo) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  try {
    const response = await axios.post(
      "https://www.varicon.nextify.dev/api/todos/",
      newTodo,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Fetch Todo
export const fetchTodoFn = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8000/api/todos/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Delete todo
export const deleteTodoFn = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `https://www.varicon.nextify.dev/api/todos/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit
export const editTodoFn = async (id, updatedTodo) => {
  console.log("aa", id, updatedTodo);
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `https://www.varicon.nextify.dev/api/todos/${id}/`,
      updatedTodo,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update todo", error);
    throw new Error("Failed to update todo");
  }
};

export const logoutFn = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "https://www.varicon.nextify.dev/api/auth/logout",
    null,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

// ../Api/api.js

// Function to fetch user data
export const fetchUserData = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`, // Assuming you store token in localStorage
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

// Function to update user data
// ../Api/api.js

export const updateUserData = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://www.varicon.nextify.dev/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user data");
  }
};
