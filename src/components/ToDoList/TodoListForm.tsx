import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { TodoListFormData, TodoListFormProps } from "../../types/types";
import { createNewTodoList, updateTodoList } from "../../redux/operation";

const TodoListForm = ({ listToEdit }: TodoListFormProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoListFormData>();

  useEffect(() => {
    if (listToEdit) {
      reset({ name: listToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [listToEdit, reset]);

  const onSubmit = (data: TodoListFormData) => {
    if (listToEdit) {
      dispatch(updateTodoList({ ...listToEdit, name: data.name }));
    } else {
      dispatch(createNewTodoList(data.name));
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex flex-col gap-4"
    >
      <label className="text-base text-gray-100 mb-1">New List Name:</label>

      <input
        {...register("name", { required: "List name is required" })}
        placeholder="Enter todo list name..."
        className="p-3 bg-slate-800 text-gray-100 border border-slate-700 rounded-md w-full text-base focus:outline-none focus:border-indigo-600 placeholder-slate-400"
      />

      {errors.name && (
        <p className="text-red-400 text-sm">{errors.name.message}</p>
      )}

      <button
        type="submit"
        className="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
      >
        {listToEdit ? "Update List" : "Create List"}
      </button>
    </form>
  );
};

export default TodoListForm;
