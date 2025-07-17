import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import TaskCard from "../components/TaskCard";
import EmptyTaskCard from "../components/EmptyTaskCard";
import { useNavigate } from "react-router-dom";

import {
  PageContainer,
  Header,
  TaskList
} from "../styles/TasksStyles";

const Tasks = ({setToken}) => {
  const [tasks, setTasks] = useState([]);
  const axios = useAxios();
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <PageContainer>
      <Header>
        <h1>To-do</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </Header>

      <TaskList>
        <EmptyTaskCard onCreated={getTasks} />
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onUpdate={getTasks} />
        ))}
      </TaskList>
    </PageContainer>
  );
};

export default Tasks;