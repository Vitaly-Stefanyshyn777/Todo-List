import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TodoListForm from "../components/ToDoList/TodoListForm";
import TodoListCard from "../components/ToDoList/TodoListCard";
import { fetchTodoLists } from "../redux/operation";
import { TodoList } from "../types/types";
import { useNavigate } from "react-router-dom"; // ← Додати цей рядок

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { lists } = useAppSelector((state) => state.todoLists);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingList, setEditingList] = useState<TodoList | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);

  const handleEdit = (list: TodoList) => {
    setEditingList(list);
    setShowCreateForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-50">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold font-serif text-slate-50">
          Personal Journal
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded-md px-4 py-2 font-medium cursor-pointer"
        >
          Logout
        </button>
      </header>

      <button
        onClick={() => {
          setShowCreateForm((prev) => !prev);
          setEditingList(null);
        }}
        className="bg-indigo-600 text-white rounded-md px-5 py-2 font-medium mb-4 hover:bg-indigo-700 transition-colors"
      >
        {showCreateForm ? "Cancel" : "+ Новое воспоминание"}
      </button>

      {showCreateForm && (
        <div className="my-4">
          <TodoListForm listToEdit={editingList} />
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        {lists && lists.length > 0 ? (
          lists.map((list) => (
            <TodoListCard
              key={list.id}
              list={list}
              onEdit={() => handleEdit(list)}
            />
          ))
        ) : (
          <p className="text-gray-400 text-base">No to-do lists found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
