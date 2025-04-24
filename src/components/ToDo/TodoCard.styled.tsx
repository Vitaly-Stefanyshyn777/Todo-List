import styled from "styled-components";

export const Card = styled.div`
  background-color: #1f2937;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #d1d5db;
`;

export const Status = styled.span<{ $completed: boolean }>`
  font-size: 0.875rem;
  color: ${(props) => (props.$completed ? "#10b981" : "#f59e0b")};
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
