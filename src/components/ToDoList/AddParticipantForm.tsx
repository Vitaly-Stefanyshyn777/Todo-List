// import { useForm } from "react-hook-form";
// import { useAppDispatch } from "../../redux/hooks";
// import { addParticipant } from "../../redux/operation";
// import { useParams } from "react-router-dom";

// interface FormValues {
//   email: string;
//   role: "admin" | "viewer";
// }

// const AddParticipantForm = () => {
//   const { reset } = useForm<FormValues>();
//   const dispatch = useAppDispatch();
//   const { id: listId } = useParams();

//   const onSubmit = (data: FormValues) => {
//     if (!listId) return;
//     dispatch(addParticipant({ listId, email: data.email, role: data.role }));
//     reset();
//   };

//   // return (
//   //   // <form
//   //   //   onSubmit={handleSubmit(onSubmit)}
//   //   //   className="mt-4 flex flex-col gap-4"
//   //   // >
//   //   //   <input
//   //   //     {...register("email")}
//   //   //     placeholder="User email"
//   //   //     required
//   //   //     className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:border-indigo-600 placeholder-slate-400"
//   //   //   />
//   //   //   <select
//   //   //     {...register("role")}
//   //   //     className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:border-indigo-600"
//   //   //   >
//   //   //     <option value="viewer">Viewer</option>
//   //   //     <option value="admin">Admin</option>
//   //   //   </select>
//   //   //   <button
//   //   //     type="submit"
//   //   //     className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
//   //   //   >
//   //   //     Add Participant
//   //   //   </button>
//   //   // </form>
//   // );
// };

// export default AddParticipantForm;
