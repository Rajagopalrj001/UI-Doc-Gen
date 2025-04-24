import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUser(null);
        navigate("/login");
    };

    return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    {/* Logo or Brand Name */}
    <a className="navbar-brand" href="/">
      AI Platform
    </a>

    {/* Navigation Links */}
    <div className="collapse navbar-collapse justify-content-end">
      <ul className="navbar-nav">
        {user ? (
          <>
            {/* Welcome User */}

            {/* Documentation Link */}
            <li className="nav-item">
              <Link to="/documentation" className="nav-link">
                Documentation Generator
              </Link>
            </li>

            {/* AI UI Generator Link */}
            <li className="nav-item">
              <Link to="/image-generation" className="nav-link">
                AI UI Generator
              </Link>
            </li>
            <li className="nav-item">
              <Link to="http://127.0.0.1:8080" className="nav-link">
                Image to HTML
              </Link>
            </li>

            <li className="nav-item text-light me-3 d-flex align-items-center">
              Welcome, <span className="ms-1 fw-bold">{user}</span>
            </li>
            {/* Logout Button */}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-danger ms-3 btn-animate"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Login Link */}
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            {/* Signup Link */}
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

    );
}

export default Nav;
