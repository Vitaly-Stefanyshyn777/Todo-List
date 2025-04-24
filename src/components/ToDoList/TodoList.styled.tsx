import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #0f172a;
  color: #f9fafb;
`;

export const Sidebar = styled.aside`
  width: 35%;
  padding: 2rem;
  background-color: #1e293b;
  border-right: 1px solid #334155;
`;

export const ListArea = styled.main`
  flex: 1;
  padding: 2rem;
`;

export const Heading = styled.h2`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  flex-direction: column;
  justify-content: space-around;
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ErrorText = styled.p`
  color: #f87171;
  font-size: 0.875rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

export const LogoutButton = styled.button`
  background-color: #ef4444;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
`;
