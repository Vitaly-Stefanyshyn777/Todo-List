import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import {
  Form,
  Label,
  Input,
  ErrorText,
  SubmitButton,
} from "./TodoListForm.styled";
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>New List Name:</Label>

      <Input
        {...register("name", { required: "List name is required" })}
        placeholder="Enter todo list name..."
      />

      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

      <SubmitButton type="submit">
        {listToEdit ? "Update List" : "Create List"}
      </SubmitButton>
    </Form>
  );
};

export default TodoListForm;
