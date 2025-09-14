import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link> | <Link to="/movies">Movies</Link>
        {user ? (
          <>
            | <Link to="/profile">{user.username}</Link>
            | <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            | <Link to="/login">Login</Link>
            | <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
