import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { InferType } from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().min(1, "Name is required").required(),
  email: yup.string().email("Invalid email").required(),
  password: yup.string().min(6, "Password is required").required(),
});

export type RegisterForm = InferType<typeof schema>;

export const useRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await axios.post("http://localhost:3022/auth/register", data);
      const loginRes = await axios.post("http://localhost:3022/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { accessToken, refreshToken, user } = loginRes.data.data;
      localStorage.setItem("refreshToken", refreshToken);
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        if (user?.role) {
          localStorage.setItem("role", user.role);
        }
        alert("Registration & login successful!");
        navigate("/dashboard");
        reset();
      } else {
        alert("Registration succeeded but token was not received.");
      }
    } catch (error: any) {
      alert("Error: registration or login failed. Please try again.");
      console.error(
        "Registration/Login failed:",
        error.response?.data || error.message
      );
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
