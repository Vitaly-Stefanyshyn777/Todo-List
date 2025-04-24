// import { useLogin } from "../hooks/useLogin";
// import {
//   Container,
//   Title,
//   Form,
//   Label,
//   Input,
//   ErrorText,
//   SubmitButton,
// } from "./LoginPage.styled";
// import { Link } from "react-router-dom";

// const LoginPage = () => {
//   const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

//   return (
//     <Container>
//       <Title>Login</Title>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <Label>Email</Label>
//           <Input type="email" {...register("email")} />
//           {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
//         </div>

//         <div>
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} />
//           {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
//         </div>

//         <SubmitButton type="submit" disabled={isSubmitting}>
//           Enter
//         </SubmitButton>
//         <p style={{ marginTop: "1rem", textAlign: "center" }}>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </Form>
//     </Container>
//   );
// };

// export default LoginPage;

// src/pages/LoginPage.tsx
import { useLogin } from "../hooks/useLogin";
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  ErrorText,
  SubmitButton,
} from "./LoginPage.styled";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

  // як тільки в localStorage є токен — робимо редірект на /dashboard
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>

        <SubmitButton type="submit" disabled={isSubmitting}>
          Enter
        </SubmitButton>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Form>
    </Container>
  );
};

export default LoginPage;
