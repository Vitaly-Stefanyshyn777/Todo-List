import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TodoListForm from "../components/ToDoList/TodoListForm";
import TodoListCard from "../components/ToDoList/TodoListCard";
import { fetchTodoLists } from "../redux/operation";
import { TodoList } from "../types/types";
import {
  Container,
  PageTitle,
  ToggleButton,
  TodoListWrapper,
  NoListMessage,
} from "./Dashboard.styled";
import { useNavigate } from "react-router-dom"; // ← Додати цей рядок

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { lists, loading, error } = useAppSelector((state) => state.todoLists);
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
    <Container>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <PageTitle style={{ fontFamily: "cursive", fontSize: "2rem" }}>
          Personal Journal
        </PageTitle>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      <ToggleButton
        onClick={() => {
          setShowCreateForm((prev) => !prev);
          setEditingList(null);
        }}
      >
        {showCreateForm ? "Cancel" : "+ Новое воспоминание"}
      </ToggleButton>

      {showCreateForm && (
        <div style={{ margin: "1rem 0" }}>
          <TodoListForm listToEdit={editingList} />
        </div>
      )}

      <TodoListWrapper>
        {lists && lists.length > 0 ? (
          lists.map((list) => (
            <TodoListCard
              key={list.id}
              list={list}
              onEdit={() => handleEdit(list)}
            />
          ))
        ) : (
          <NoListMessage>No to-do lists found.</NoListMessage>
        )}
      </TodoListWrapper>
    </Container>
  );
};

export default Dashboard;
