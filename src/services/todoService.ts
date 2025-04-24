import axios from "axios";
import { Todo } from "../types/types";

// const API_BASE = "https://react-quizapp-backend.onrender.com";
const API_BASE = "http://localhost:3022";
// http://localhost:3022

export const createTodoList = async (name: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_BASE}/todo-lists`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getTodoLists = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE}/todo-lists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editTodoList = async (id: string, newName: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `${API_BASE}/todo-lists/${id}`,
    { name: newName },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteTodoList = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_BASE}/todo-lists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTodo = async (todoListId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${API_BASE}/todo-lists/${todoListId}/todos`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const addTodo = async (todoListId: string, todo: Omit<Todo, "id">) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_BASE}/todo-lists/${todoListId}/todos`,
    todo,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateTodo = async (todoListId: string, todo: Todo) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `${API_BASE}/todo-lists/${todoListId}/todos/${todo.id}`,
    todo,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteTodo = async (todoListId: string, todoId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `${API_BASE}/todo-lists/${todoListId}/todos/${todoId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const addParticipantToList = async (
  listId: string,
  email: string,
  role: "admin" | "viewer" = "viewer"
) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_BASE}/todo-lists/${listId}/participants`,
    { email, role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
// import axios from "axios";
// import { Todo } from "../types/types";

// // const API_BASE = "https://react-quizapp-backend.onrender.com";
// const API_BASE = "http://localhost:3022";
// // http://localhost:3022

// export const createTodoList = async (name: string) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.post(
//     `${API_BASE}/todo-lists`,
//     { name },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// export const getTodoLists = async () => {
//   const token = localStorage.getItem("token");
//   const response = await axios.get(`${API_BASE}/todo-lists`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const editTodoList = async (id: string, newName: string) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.patch(
//     `${API_BASE}/todo-lists/${id}`,
//     { name: newName },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// export const deleteTodoList = async (id: string) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.delete(`${API_BASE}/todo-lists/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const getTodo = async (todoListId: string) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.get(
//     `${API_BASE}/todo-lists/${todoListId}/todos`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return response.data;
// };

// export const addTodo = async (todoListId: string, todo: Omit<Todo, "id">) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.post(
//     `${API_BASE}/todo-lists/${todoListId}/todos`,
//     todo,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// export const updateTodo = async (todoListId: string, todo: Todo) => {
//   if (!todoListId || !todo?.id) {
//     throw new Error("Invalid todo or todoListId");
//   }

//   const token = localStorage.getItem("token");

//   const { id, name, description, completed } = todo;

//   const payload = {
//     ...(name !== undefined && { name }),
//     ...(description !== undefined && { description }),
//     ...(typeof completed === "boolean" && { completed }),
//   };

//   const response = await axios.patch(
//     `${API_BASE}/todo-lists/${todoListId}/todos/${id}`,
//     payload,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// export const deleteTodo = async (todoListId: string, todoId: string) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.delete(
//     `${API_BASE}/todo-lists/${todoListId}/todos/${todoId}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };
