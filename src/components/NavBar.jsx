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
    <div>
      <div className="nav-bar-wrapper">
        <div>
          <Link to="/">
            <div className="logo">
              <img src="/animalgogo.svg" alt="Animalgogo logo" />
            </div>
          </Link>
        </div>
        <nav>
          <ul className="nav-bar-list">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              {auth.token ? <Link to="/dashboard">Dashboard</Link> : null}
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
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default NavBar;
