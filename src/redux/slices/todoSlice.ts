import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "../../types/types";
import { createTodo, deleteTodo, fetchTodo, updateTodo } from "../operation";

const initialState: TodoState = {
  name: "",
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todos = action.payload;
    },
    clearTodoList: (state) => {
      state.todos = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        if (state.todos) {
          const exists = state.todos.find((t) => t.id === action.payload.id);
          if (!exists) {
            state.todos.push(action.payload);
          }
        }
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        if (state.todos) {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todos[index] = { ...state.todos[index], ...action.payload };
          } else {
            console.error("Todo not found for update:", action.payload.id);
          }
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        if (state.todos) {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
        }
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setTodoList, clearTodoList } = todosSlice.actions;

export default todosSlice.reducer;
