import { TodoCardProps } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTodo } from "../../redux/operation";
import { useState, useEffect } from "react";

const TodoCard = ({ todo, onEdit }: TodoCardProps) => {
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleDelete = async () => {
    if (!todo.id) {
      console.warn("Cannot delete todo without id", todo);
      return;
    }
    try {
      await dispatch(
        deleteTodo({ todoListId: todo.todoListId, todoId: todo.id })
      ).unwrap();
    } catch (error) {
      console.error("Error deleting Todo:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-100 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-white">{todo.name}</h3>
      <p className="text-base leading-relaxed text-gray-300">
        {todo.description}
      </p>
      <span
        className={`text-sm font-medium ${
          todo.completed ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {todo.completed ? "✅ Completed" : "⌛ Pending"}
      </span>
      {role === "admin" && (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            ✏️ Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
