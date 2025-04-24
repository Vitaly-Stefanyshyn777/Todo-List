import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { addParticipant } from "../../redux/operation";
import { useParams } from "react-router-dom";

interface FormValues {
  email: string;
  role: "admin" | "viewer";
}

const AddParticipantForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const { id: listId } = useParams();

  const onSubmit = (data: FormValues) => {
    if (!listId) return;
    dispatch(addParticipant({ listId, email: data.email, role: data.role }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "1rem" }}>
      <input {...register("email")} placeholder="User email" required />
      <select {...register("role")}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Add Participant</button>
    </form>
  );
};

export default AddParticipantForm;
