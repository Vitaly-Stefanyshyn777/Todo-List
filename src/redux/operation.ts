import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodo,
  addTodo,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService,
  createTodoList,
  getTodoLists,
  addParticipantToList,
  deleteTodoList as deleteTodoListService,
  editTodoList as updateTodoListService,
} from "../services/todoService";

import { Todo, TodoList } from "../types/types";

export const fetchTodo = createAsyncThunk(
  "todo/fetchTasks",
  async (todoListId: string, { rejectWithValue }) => {
    try {
      const tasks = await getTodo(todoListId);
      return tasks as Todo[];
    } catch {
      return rejectWithValue("Failed to load tasks");
    }
  }
);

export const createTodo = createAsyncThunk(
  "todo/createTask",
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const newTodo = await addTodo(todo.todoListId, todo);
      return newTodo;
    } catch {
      return rejectWithValue("Failed to create task");
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTask",
  async (todo: Todo, { rejectWithValue }) => {
    try {
      await updateTodoService(todo.todoListId, todo);
      return todo;
    } catch {
      return rejectWithValue("Failed to update task");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTask",
  async (
    { todoListId, todoId }: { todoListId: string; todoId: string },
    { rejectWithValue }
  ) => {
    try {
      await deleteTodoService(todoListId, todoId);
      return todoId;
    } catch {
      return rejectWithValue("Failed to delete task");
    }
  }
);

export const fetchTodoLists = createAsyncThunk(
  "todos/fetchTodoLists",
  async (_, thunkAPI) => {
    try {
      const data = await getTodoLists();
      return data as TodoList[];
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

export const createNewTodoList = createAsyncThunk(
  "todos/createTodoList",
  async (name: string, thunkAPI) => {
    try {
      const data = await createTodoList(name);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

export const deleteTodoList = createAsyncThunk(
  "todos/deleteTodoList",
  async (id: string, thunkAPI) => {
    try {
      await deleteTodoListService(id);
      return id;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

export const updateTodoList = createAsyncThunk(
  "todos/updateTodoList",
  async ({ id, name }: { id: string; name: string }, thunkAPI) => {
    try {
      await updateTodoListService(id, name);
      return { id, name };
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }

      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

export const addParticipant = createAsyncThunk(
  "todo/addParticipant",
  async (
    {
      listId,
      email,
      role,
    }: { listId: string; email: string; role: "admin" | "viewer" },
    { rejectWithValue }
  ) => {
    try {
      const response = await addParticipantToList(listId, email, role);
      return response.data;
    } catch (error: unknown) {
      let message = "Failed to add participant";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message;
      }
      return rejectWithValue(message);
    }
  }
);
