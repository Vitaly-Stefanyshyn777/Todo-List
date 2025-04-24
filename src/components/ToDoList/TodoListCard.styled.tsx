import styled from "styled-components";
import { Link } from "react-router-dom";

export const Card = styled.div`
  background-color: #1f2937;
  padding: 1.25rem 1rem;
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #f9fafb;
`;

export const CardLink = styled(Link)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const CardMeta = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EditButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

export const DeleteButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #dc2626;
  }
`;
