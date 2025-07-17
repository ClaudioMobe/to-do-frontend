import styled from "styled-components";

export const PageContainer = styled.div`
  background-color: #111;
  min-height: 100vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  overflow-x: hidden;
  width: 100vw;
  box-sizing: border-box;
  
  @media (max-width: 640px) {
    padding: 1rem;
    margin: 1rem;
    max-width: 100vw;
  }
`;


export const Header = styled.header`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    color: white;
  }

  button {
    background: #222;
    color: white;
    border: 1px solid #555;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: 0.2s;

    &:hover {
      background-color: #fff;
      color: #000;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const TaskList = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1rem;
`;
