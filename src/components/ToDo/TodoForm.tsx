// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useAppDispatch } from "../../redux/hooks";
// // import { createTodo, updateTodo } from "../../redux/slices/todoSlice";
// import { TodoFormData, Todo } from "../../types/types";
// import { useParams } from "react-router-dom";
// import { createTodo, updateTodo } from "../../redux/operation";
// import {
//   Form,
//   Label,
//   Input,
//   ErrorText,
//   CheckboxWrapper,
//   SubmitButton,
//   CancelButton,
// } from "./TodoForm.styled";
// const TodoForm = ({
//   editingTodo,
//   setEditingTodo,
// }: {
//   editingTodo: Todo | null;
//   setEditingTodo: (todo: Todo | null) => void;
// }) => {
//   const dispatch = useAppDispatch();
//   const { id: todoListId } = useParams();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<TodoFormData>();

//   useEffect(() => {
//     if (editingTodo) {
//       setValue("name", editingTodo.name);
//       setValue("description", editingTodo.description);
//       setValue("completed", editingTodo.completed);
//     } else {
//       reset();
//     }
//   }, [editingTodo, reset, setValue]);

//   const onSubmit = (data: TodoFormData) => {
//     const payload = {
//       ...data,
//       completed: !!data.completed, // <- це є правильно
//     };

//     if (editingTodo && editingTodo.id) {
//       dispatch(updateTodo({ ...editingTodo, ...payload, todoListId } as Todo));
//       setEditingTodo(null);
//     } else {
//       dispatch(createTodo({ ...payload, todoListId } as Todo));
//     }
//     reset();
//   };

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <Label>Name</Label>
//         <Input
//           {...register("name", { required: "Name is required" })}
//           placeholder="Todo name"
//         />
//         {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
//       </div>

//       <div>
//         <Label>Description</Label>
//         <Input
//           {...register("description", { required: "Description is required" })}
//           placeholder="Todo description"
//         />
//         {errors.description && (
//           <ErrorText>{errors.description.message}</ErrorText>
//         )}
//       </div>

//       <CheckboxWrapper>
//         <input
//           type="checkbox"
//           defaultChecked={editingTodo?.completed ?? false}
//           {...register("completed")}
//         />
//         <Label>Completed</Label>
//       </CheckboxWrapper>

//       <div style={{ display: "flex", gap: "0.5rem" }}>
//         <SubmitButton type="submit">
//           {editingTodo ? "Update" : "Create"}
//         </SubmitButton>
//         {editingTodo && (
//           <CancelButton
//             type="button"
//             onClick={() => {
//               setEditingTodo(null);
//               reset();
//             }}
//           >
//             Cancel
//           </CancelButton>
//         )}
//       </div>
//     </Form>
//   );
// };

// export default TodoForm;
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { TodoFormData, Todo } from "../../types/types";
import { useParams } from "react-router-dom";
import { createTodo, updateTodo } from "../../redux/operation";
import { fetchTodo } from "../../redux/operation";
import {
  Form,
  Label,
  Input,
  ErrorText,
  CheckboxWrapper,
  SubmitButton,
} from "./TodoForm.styled";

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Name</Label>
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Todo name"
        />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      </div>

      <div>
        <Label>Description</Label>
        <Input
          {...register("description", { required: "Description is required" })}
          placeholder="Todo description"
        />
        {errors.description && (
          <ErrorText>{errors.description.message}</ErrorText>
        )}
      </div>

      <CheckboxWrapper>
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
        <Label>Completed</Label>
      </CheckboxWrapper>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <SubmitButton type="submit">
          {editingTodo ? "Update" : "Create"}
        </SubmitButton>
        {editingTodo && (
          <SubmitButton
            type="button"
            style={{ backgroundColor: "#6b7280" }}
            onClick={() => {
              setEditingTodo(null);
              reset();
            }}
          >
            Cancel
          </SubmitButton>
        )}
      </div>
    </Form>
  );
};

export default TodoForm;
