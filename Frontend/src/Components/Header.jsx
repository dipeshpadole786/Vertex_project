import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [unreadCount, setUnreadCount] = useState(3); // 🔔 Placeholder

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("stackit-user"));
        if (user?.username) {
            setIsAuthenticated(true);
            setUsername(user.username);
        }
    }, []);

    const handleLogout = () => {
        // Clear session
        fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
        });

        // Clear local storage and redirect
        localStorage.removeItem("stackit-user");
        setIsAuthenticated(false);
        setUsername("");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container-fluid px-4">
                {/* Brand / Logo */}
                <Link className="navbar-brand fw-bold text-warning fs-4" to="/">
                    <i className="bi bi-stack me-2"></i>StackIt
                </Link>

                {/* Mobile Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Nav Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Left Side Nav */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/add-quetion">
                                <i className="bi bi-question-circle me-1"></i> Ask
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/tags">
                                <i className="bi bi-tags me-1"></i> Tags
                            </Link>
                        </li>
                    </ul>

                    {/* Right Side: Notifications & Auth */}
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {/* Notification Icon */}
                        {isAuthenticated && (
                            <li className="nav-item me-3 position-relative">
                                <Link
                                    className="nav-link p-0 d-flex align-items-center"
                                    to="/notifications"
                                >
                                    <i
                                        className="bi bi-bell"
                                        style={{ fontSize: "1.2rem", color: "#fff" }}
                                    ></i>
                                    {unreadCount > 0 && (
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge bg-danger"
                                            style={{
                                                fontSize: "0.6rem",
                                                padding: "3px 5px",
                                                borderRadius: "10px",
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            {unreadCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        )}

                        {/* Auth Links */}
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-warning btn-sm ms-2" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle text-light btn btn-outline-warning btn-sm"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-person-circle me-1"></i> {username}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to={`/user/${username}`}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
