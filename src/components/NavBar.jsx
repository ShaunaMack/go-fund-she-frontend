import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };
  return (
    <div className="nav-bar-wrapper">
      <nav>
        <ul className="nav-bar-list">
          <li>
            <Link to="/">
              <div className="logo">
                <img src="../../public/animalgogo.svg" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {auth.token ? <Link to="/dashboard">My dashboard</Link> : null}
          </li>
          <li>
            {auth.token ? (
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
