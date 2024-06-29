import axios from "axios";

export const signupMutation = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
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
      "http://localhost:8000/api/auth/login",
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
      "http://localhost:8000/api/todos/",
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
      `http://localhost:8000/api/todos/${id}/`,
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
      `http://localhost:8000/api/todos/${id}/`,
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
    "http://localhost:8000/api/auth/logout",
    null,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};
