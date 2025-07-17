import styled from "styled-components";

export const Card = styled.div`
  background-color: #111;
  border: 2px solid white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem auto;
  color: white;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 0 10px #fff3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  word-wrap: break-word;

  @media (max-width: 640px) {
    padding: 1rem;
    margin: 1rem;
    max-width: 100%;
  }
`;

export const EditableInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  font-size: 1.5rem;
  color: white;
  width: 100%;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #0f0;
  }

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

export const SubtaskList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SubtaskItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  input[type="checkbox"] {
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
    accent-color: #0f0;
  }

  input[type="text"] {
    flex: 1;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff4;
    color: white;
    font-size: 0.95rem;
    min-width: 0;

    &:focus {
      outline: none;
      border-color: #0f0;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CommentsSection = styled.div`
  border-top: 1px solid white;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .comment {
    background: #1a1a1a;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input[type="text"] {
      background: transparent;
      border: none;
      border-bottom: 1px solid #666;
      color: white;
      font-size: 0.95rem;
      width: 100%;

      &:disabled {
        opacity: 0.7;
        border-bottom: none;
      }

      &:focus {
        outline: none;
        border-color: #0f0;
      }
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }
  }

  textarea {
    width: 100%;
    max-width: 100%;
    background: #1a1a1a;
    border: 1px solid #555;
    color: white;
    padding: 0.75rem;
    border-radius: 6px;
    font-size: 0.9rem;
    resize: none;
    font-style: normal;
    box-sizing: border-box;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SmallButton = styled.button`
  background: #222;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: 0.2s ease-in-out;
  width: 100%;
  max-width: 100%;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    background-color: white;
    color: #000;
  }
`;