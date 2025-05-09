import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import TodoList from "./components/ToDoList/TodoList";
// import TestCheckbox from "./components/Test/TestCheckbox";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/test" element={<TestCheckbox />} /> */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/:id"
        element={
          <PrivateRoute>
            <TodoList />
            {/* <TestCheckbox /> */}
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
