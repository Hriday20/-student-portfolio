import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../api/api";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "15px", backgroundColor: "#1976d2" }}>
      <Link
        to="/"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Home
      </Link>

      <Link
        to="/projects"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Projects
      </Link>

      <Link
        to="/contact"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Contact
      </Link>

      {!isLoggedIn ? (
        <>
          <Link
            to="/login"
            style={{
              color: "white",
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            padding: "5px 10px",
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;