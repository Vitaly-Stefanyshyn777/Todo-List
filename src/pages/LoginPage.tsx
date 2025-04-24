import { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-700 rounded-md bg-gray-800 shadow text-white">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-500"
        >
          Enter
        </button>
        <p className="mt-4 text-center text-gray-300">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
