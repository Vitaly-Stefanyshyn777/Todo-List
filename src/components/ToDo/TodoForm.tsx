import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { TodoFormData, Todo } from "../../types/types";
import { useParams } from "react-router-dom";
import { createTodo, updateTodo } from "../../redux/operation";
import { fetchTodo } from "../../redux/operation";

const TodoForm = ({
  editingTodo,
  setEditingTodo,
}: {
  editingTodo: Todo | null;
  setEditingTodo: (todo: Todo | null) => void;
}) => {
  const dispatch = useAppDispatch();
  const { id: todoListId } = useParams();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    defaultValues: {
      id: editingTodo?.id,
      name: editingTodo?.name || "",
      description: editingTodo?.description || "",
      completed: editingTodo?.completed ?? false,
    },
  });

  useEffect(() => {
    reset({
      id: editingTodo?.id,
      name: editingTodo?.name || "",
      description: editingTodo?.description || "",
      completed: editingTodo?.completed ?? false,
    });
  }, [editingTodo, reset]);

  const onSubmit = (data: TodoFormData) => {
    const payload = {
      id: editingTodo?.id,
      name: data.name,
      description: data.description,
      completed: !!data.completed,
    };

    if (editingTodo?.id) {
      dispatch(
        updateTodo({
          ...editingTodo,
          ...payload,
          todoListId,
        } as Todo)
      );
      setEditingTodo(null);
    } else {
      dispatch(
        createTodo({
          ...payload,
          todoListId,
        } as Todo)
      );
      if (todoListId) dispatch(fetchTodo(todoListId));
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <label className="block text-white mb-1 text-base">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Todo name"
          className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-md text-base focus:outline-none focus:border-indigo-600 placeholder-slate-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-white mb-1 text-base">Description</label>
        <input
          {...register("description", { required: "Description is required" })}
          placeholder="Todo description"
          className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-md text-base focus:outline-none focus:border-indigo-600 placeholder-slate-400"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2 text-white">
        <Controller
          name="completed"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <input
              type="checkbox"
              ref={ref}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          )}
        />
        <label className="block text-white mb-1 text-base">Completed</label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700"
        >
          {editingTodo ? "Update" : "Create"}
        </button>
        {editingTodo && (
          <button
            type="button"
            className="bg-gray-600 text-white px-5 py-2 rounded-md font-medium hover:bg-gray-700"
            onClick={() => {
              setEditingTodo(null);
              reset();
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
