import { Link } from "react-router-dom";
import { TodoListCardProps } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTodoList } from "../../redux/operation";
import { useState, useEffect } from "react";

const ToDoListCard = ({ list, onEdit }: TodoListCardProps) => {
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTodoList(list.id)).unwrap();
    } catch (error) {
      console.error("Error deleting To-Do List:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg flex justify-between items-center shadow-sm text-gray-50">
      <div>
        <Link
          to={`/dashboard/${list.id}`}
          className="text-lg font-semibold text-white hover:underline"
        >
          {list.name}
        </Link>
        <p className="text-xs text-gray-400 mt-1">
          Created: {new Date(list.createdAt).toLocaleDateString()}
        </p>
      </div>

      {role === "admin" && (
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md font-medium cursor-pointer hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md font-medium cursor-pointer hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ToDoListCard;
