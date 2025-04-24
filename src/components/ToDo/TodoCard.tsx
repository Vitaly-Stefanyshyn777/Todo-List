import { TodoCardProps } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTodo } from "../../redux/operation";
import {
  Card,
  Title,
  Description,
  Status,
  ButtonGroup,
  ActionButton,
} from "./TodoCard.styled";
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
    <Card>
      <Title>{todo.name}</Title>
      <Description>{todo.description}</Description>
      <Status $completed={todo.completed}>
        {todo.completed ? "✅ Completed" : "⌛ Pending"}
      </Status>
      {role === "admin" && (
        <ButtonGroup>
          <ActionButton onClick={onEdit} color="#2563eb">
            ✏️ Edit
          </ActionButton>
          <ActionButton onClick={handleDelete} color="#dc2626">
            🗑️ Delete
          </ActionButton>
        </ButtonGroup>
      )}
    </Card>
  );
};

export default TodoCard;
