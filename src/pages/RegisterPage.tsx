import { useRegister } from "../hooks/useRegister";
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  ErrorText,
  SubmitButton,
} from "./RegisterPage.styled";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useRegister();

  return (
    <Container>
      <Title>Registration</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Name</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </div>

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
          Register
        </SubmitButton>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default RegisterPage;
