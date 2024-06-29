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
