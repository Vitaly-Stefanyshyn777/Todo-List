import {
  Card,
  CardLink,
  CardMeta,
  ButtonWrapper,
  EditButton,
  DeleteButton,
} from "./TodoListCard.styled";
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
    <Card>
      <div>
        <CardLink to={`/dashboard/${list.id}`}>{list.name}</CardLink>
        <CardMeta>
          Created: {new Date(list.createdAt).toLocaleDateString()}
        </CardMeta>
      </div>

      {role === "admin" && (
        <ButtonWrapper>
          <EditButton onClick={onEdit}>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ButtonWrapper>
      )}
    </Card>
  );
};

export default ToDoListCard;
