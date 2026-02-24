import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";
import "./style/Register.css";
import "./style/nav.css";
import "./style/index.css";
import "./style/EmployeeForm.css";
import "./style/EmployeeTables.css";
import "./style/Filter.css";
import "./style/Homepage.css";
import "./style/Profile.css";
import "./style/Login.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
