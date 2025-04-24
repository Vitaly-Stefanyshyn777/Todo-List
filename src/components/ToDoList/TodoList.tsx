import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackButton, LogoutButton } from "./TodoList.styled";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { fetchTodo } from "../../redux/slices/todoSlice";
import TodoCard from "../ToDo/TodoCard";
import TodoForm from "../ToDo/TodoForm";
import AddParticipantForm from "./AddParticipantForm";
import { Todo } from "../../types/types";
import { fetchTodo } from "../../redux/operation";

import {
  Container,
  Sidebar,
  Heading,
  ListArea,
  CardsWrapper,
  ErrorText,
} from "./TodoList.styled";

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
    <Container>
      <Header></Header>
      <Sidebar>
        <Heading>
          <BackButton onClick={handleBack}>← Back</BackButton>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          {editingTodo ? "Edit Todo" : "Create New Todo"}
        </Heading>
        <TodoForm editingTodo={editingTodo} setEditingTodo={setEditingTodo} />
        <AddParticipantForm />
      </Sidebar>

      <ListArea>
        <Heading as="h2">Todo List</Heading>

        {loading && <p>Loading...</p>}
        {error && <ErrorText>{error}</ErrorText>}
        {todos?.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <CardsWrapper>
            {todos?.map((todo) => (
              // <TodoCard
              //   key={`${todo.id}-${todo.name}`}
              //   todo={todo}
              //   onEdit={() => setEditingTodo(todo)}
              // />
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={() => setEditingTodo(todo)}
              />
            ))}
          </CardsWrapper>
        )}
      </ListArea>
    </Container>
  );
};

export default TodoList;
