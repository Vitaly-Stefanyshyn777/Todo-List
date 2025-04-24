import styled from "styled-components";

export const Form = styled.form`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #f9fafb;
  margin-bottom: 0.25rem;
  display: block;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  background-color: #1e293b;
  color: #f9fafb;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ErrorText = styled.p`
  color: #f87171;
  font-size: 0.875rem;
`;

export const SubmitButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;
