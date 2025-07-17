import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Tasks from "./pages/Tasks";
import { useState } from "react";

const App = () => {
  const [ token, setToken ] = useState(localStorage.getItem("token"))

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/tasks" : "/login"} />} />
        <Route path="/login" element={token ? <Navigate to="/tasks" /> : <Auth setToken={setToken} />} />
        <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
 
export default App;