import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoList, TodosState } from "../../types/types";
import {
  createNewTodoList,
  deleteTodoList,
  fetchTodoLists,
  updateTodoList,
} from "../operation";

const initialState: TodosState = {
  lists: [],
  loading: false,
  createdAt: new Date().toISOString(),
  error: null,
  userId: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchTodoLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createNewTodoList.fulfilled,
        (state, action: PayloadAction<TodoList>) => {
          state.lists.push(action.payload);
        }
      )
      .addCase(createNewTodoList.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload);
      })
      .addCase(deleteTodoList.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateTodoList.fulfilled, (state, action) => {
        const updatedList = action.payload;
        const index = state.lists.findIndex(
          (list) => list.id === updatedList.id
        );
        if (index !== -1) {
          state.lists[index] = {
            ...state.lists[index],
            name: updatedList.name,
          };
        }
      })
      .addCase(updateTodoList.rejected, (state, action) => {
        state.error = action.payload as string | null;
      });
  },
});

// export const {} = todosSlice.actions;

export default todosSlice.reducer;
