import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {
  //Use user Context
  const { user, setUser } = useContext(UserContext);

  //Use User Navigate
  const navigate = useNavigate();

  //handle logout function
  const handleLogout = () => {
    if (confirm("Do you want to logout ?")) {
      setUser({ email: null, posts: [] });
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4 max-w-screen-lg mx-auto">
          <Link
            to="/"
            title="Home"
            className="fa-solid fa-house-chimney text-2xl nav-link"
          ></Link>

          {user.email ? (
            <div className="flex items-center gap-5">
              <Link
                title="Create Post"
                to="/create"
                className="fa-solid fa-solid fa-circle-plus text-2xl nav-link"
              ></Link>
              <Link
                title="Dashboard"
                to="/dashboard"
                className="fa-solid fa-user text-2xl nav-link"
              ></Link>
              <button
                title="Logout"
                onClick={handleLogout}
                className="fa-solid fa-right-from-bracket text-2xl nav-link"
              ></button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                title="Login"
                to="/login"
                className="fa-solid fa-solid fa-right-to-bracket text-2xl nav-link"
              ></Link>
              <Link
                title="Register"
                to="/register"
                className="fa-solid fa-user-plus text-2xl nav-link"
              ></Link>
            </div>
          )}
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
