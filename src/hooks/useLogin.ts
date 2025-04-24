import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type LoginForm = yup.InferType<typeof schema>;

export const useLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>({ resolver: yupResolver(schema) });
  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        // "http://localhost:3022/auth/login",
        "https://todo-list-bek.onrender.com/auth/login",
        data
      );

      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem("refreshToken", refreshToken);

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        if (user?.role) {
          localStorage.setItem("role", user.role); // 🔐 збереження ролі
        }
        navigate("/dashboard");
        alert("Login successful!");
        reset();
      } else {
        alert("Access token not received.");
      }
    } catch (error: unknown) {
      let message = "Error: login failed. Please try again.";
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
        message = error.response?.data?.message ?? message;
      } else {
        console.error("Login failed:", error);
      }
      alert(message);
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};
