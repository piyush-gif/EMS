import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">HomePage</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
