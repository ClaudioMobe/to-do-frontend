import styled from "styled-components";

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111;
  color: white;
`;

export const AuthForm = styled.form`
  background-color: #1c1c1c;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px #00000077;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

export const AuthInput = styled.input`
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #2a2a2a;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #0f0;
  }
`;

export const AuthButton = styled.button`
  padding: 0.75rem;
  border: 1px solid white;
  background-color: #222;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 0.5rem;

  button {
    background: none;
    color: #0f0;
    border: none;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #9f9;
    }
  }
`;

export const ErrorText = styled.p`
  color: #f66;
  font-size: 0.9rem;
  text-align: center;
`;
