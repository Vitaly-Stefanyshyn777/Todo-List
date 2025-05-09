import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface FormValues {
  name: string;
  description: string;
  completed: boolean;
}

// const API_BASE = "http://localhost:3022";
const API_BASE = "https://todo-list-bek.onrender.com";
const TODO_LIST_ID = "6807e7fb06618e9444009c10";

export default function TestCheckbox() {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      name: "Test Task",
      description: "This is a test",
      completed: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      todoListId: TODO_LIST_ID,
    };

    console.log("📤 Відправка:", payload);

    try {
      const res = await axios.post(
        `${API_BASE}/todo-lists/${TODO_LIST_ID}/todos`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // або встав токен вручну для тесту
          },
        }
      );

      console.log("✅ Сервер повернув:", res.data);
    } catch (err) {
      console.error("❌ Помилка:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <Controller
          name="completed"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        Completed
      </label>

      <p>📊 Поточне значення: {watch("completed") ? "✅ true" : "❌ false"}</p>

      <button type="submit">Відправити</button>
    </form>
  );
}
