import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useRegister();

  return (
    <div className="max-w-md mx-auto my-10 p-6 border border-gray-700 rounded-lg bg-gray-800 shadow text-white">
      <h2 className="text-2xl font-bold mb-6">Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded"
            {...register("password")}
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
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
