import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TodoCard from "../ToDo/TodoCard";
import TodoForm from "../ToDo/TodoForm";
import AddParticipantForm from "./AddParticipantForm";
import { Todo } from "../../types/types";
import { fetchTodo } from "../../redux/operation";

const TodoList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todos);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchTodo(id));
    }
  }, [id, dispatch]);

  return (
    <div className="flex flex-row min-h-screen bg-slate-900 text-slate-50">
      <div className="flex justify-between items-center p-4"></div>
      <aside className="w-1/3 p-8 bg-slate-800 border-r border-slate-700">
        <div className="flex flex-col justify-around mb-6 text-xl font-semibold">
          <button onClick={handleBack} className="text-base cursor-pointer">
            ← Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-md px-4 py-2 font-medium cursor-pointer"
          >
            Logout
          </button>
          <span>{editingTodo ? "Edit Todo" : "Create New Todo"}</span>
        </div>
        <TodoForm editingTodo={editingTodo} setEditingTodo={setEditingTodo} />
        <AddParticipantForm />
      </aside>

      <main className="flex-1 p-8">
        <h2 className="mb-6 text-2xl font-semibold">Todo List</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {todos?.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {todos?.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={() => setEditingTodo(todo)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoList;
