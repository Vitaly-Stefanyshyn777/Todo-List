import styled from "styled-components";

export const Container = styled.div`
  max-width: 28rem;
  margin: 2.5rem auto;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
`;

export const SubmitButton = styled.button`
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;
