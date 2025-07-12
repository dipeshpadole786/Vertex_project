import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define reusable theme styles (consistent with Home.jsx, Footer.jsx, AnswerPage.jsx)
const theme = {
    primaryBg: 'linear-gradient(to bottom, #1a202c, #2d3748)',
    cardBg: 'rgba(45, 55, 72, 0.9)',
    primaryText: '#e2e8f0',
    secondaryText: '#a0aec0',
    accentColor: '#4299e1',
    accentHover: '#2b6cb0',
    secondaryAccent: '#f6e05e',
    secondaryAccentHover: '#ed8936',
    dangerColor: '#e53e3e',
    dangerHover: '#c53030',
    borderColor: '#4a5568',
    fontFamily: "'Inter', Arial, sans-serif",
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)',
    shadowHover: '0 10px 15px rgba(0, 0, 0, 0.2), 0 15px 25px rgba(0, 0, 0, 0.15)',
};

export const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [unreadCount, setUnreadCount] = useState(3); // Placeholder
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown toggle

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("stackit-user"));
            console.log("user from localStorage:", user);

            if (user && typeof user.username === "string") {
                setIsAuthenticated(true);
                setUsername(user.username);
                setRole(user.role || "user");
            }
        } catch (err) {
            console.error("Invalid user data in localStorage", err);
        }
    }, []);

    const handleLogout = () => {
        fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
        });

        localStorage.removeItem("stackit-user");
        setIsAuthenticated(false);
        setUsername("");
        setRole("");
        navigate("/login");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <nav style={{
            position: 'sticky',
            top: '0',
            zIndex: '1000',
            background: theme.cardBg,
            backdropFilter: 'blur(4px)',
            boxShadow: theme.shadow,
            padding: '12px 24px',
            fontFamily: theme.fontFamily,
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                flexWrap: 'wrap',
                gap: '16px',
            }}>
                <Link
                    to="/home"
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: theme.secondaryAccent,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = theme.secondaryAccentHover)}
                    onMouseOut={(e) => (e.currentTarget.style.color = theme.secondaryAccent)}
                >
                    <i className="bi bi-stack" style={{ marginRight: '8px' }}></i>
                    StackIt
                </Link>

                <button
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: theme.primaryText,
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        const navbarContent = document.getElementById("navbarContent");
                        navbarContent.style.display = navbarContent.style.display === 'flex' ? 'none' : 'flex';
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    id="navbarContent"
                    style={{
                        display: 'flex',
                        flexGrow: '1',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <Link
                            to="/add-question"
                            style={{
                                color: theme.primaryText,
                                textDecoration: 'none',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 12px',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = theme.accentColor)}
                            onMouseOut={(e) => (e.currentTarget.style.color = theme.primaryText)}
                        >
                            <i className="bi bi-question-circle" style={{ marginRight: '8px' }}></i>
                            Ask
                        </Link>
                        <Link
                            to="/tags"
                            style={{
                                color: theme.primaryText,
                                textDecoration: 'none',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 12px',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = theme.accentColor)}
                            onMouseOut={(e) => (e.currentTarget.style.color = theme.primaryText)}
                        >
                            <i className="bi bi-tags" style={{ marginRight: '8px' }}></i>
                            Tags
                        </Link>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                    }}>
                        {isAuthenticated && (
                            <Link
                                to="/notifications"
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    color: theme.primaryText,
                                    textDecoration: 'none',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.color = theme.accentColor)}
                                onMouseOut={(e) => (e.currentTarget.style.color = theme.primaryText)}
                            >
                                <i className="bi bi-bell" style={{ fontSize: '1.2rem' }}></i>
                                {unreadCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        background: theme.dangerColor,
                                        color: '#ffffff',
                                        fontSize: '0.6rem',
                                        padding: '3px 5px',
                                        borderRadius: '10px',
                                        transform: 'translate(50%, -50%)',
                                    }}>
                                        {unreadCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    style={{
                                        color: theme.primaryText,
                                        textDecoration: 'none',
                                        fontSize: '1rem',
                                        padding: '8px 12px',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = theme.accentColor)}
                                    onMouseOut={(e) => (e.currentTarget.style.color = theme.primaryText)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    style={{
                                        padding: '8px 16px',
                                        background: theme.secondaryAccent,
                                        color: '#1a202c',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.background = theme.secondaryAccentHover)}
                                    onMouseOut={(e) => (e.currentTarget.style.background = theme.secondaryAccent)}
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <button
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 16px',
                                        background: 'none',
                                        border: `1px solid ${theme.secondaryAccent}`,
                                        color: theme.secondaryAccent,
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={toggleDropdown}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = theme.secondaryAccent;
                                        e.currentTarget.style.color = '#1a202c';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'none';
                                        e.currentTarget.style.color = theme.secondaryAccent;
                                    }}
                                >
                                    <i className="bi bi-person-circle" style={{ marginRight: '8px' }}></i>
                                    {username}
                                    {role === "admin" && (
                                        <span style={{
                                            marginLeft: '8px',
                                            background: theme.dangerColor,
                                            color: '#ffffff',
                                            fontSize: '0.75rem',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                        }}>
                                            Admin
                                        </span>
                                    )}
                                    <i className="bi bi-caret-down-fill" style={{ marginLeft: '8px' }}></i>
                                </button>
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: '0',
                                    background: theme.cardBg,
                                    border: `1px solid ${theme.borderColor}`,
                                    borderRadius: '8px',
                                    boxShadow: theme.shadow,
                                    minWidth: '150px',
                                    display: isDropdownOpen ? 'flex' : 'none',
                                    flexDirection: 'column',
                                    zIndex: '1000',
                                }}>
                                    <Link
                                        to={`/user/${username}`}
                                        style={{
                                            padding: '8px 16px',
                                            color: theme.primaryText,
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                        }}
                                        onClick={() => setIsDropdownOpen(false)}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = theme.accentHover;
                                            e.currentTarget.style.color = '#ffffff';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'none';
                                            e.currentTarget.style.color = theme.primaryText;
                                        }}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'none',
                                            border: 'none',
                                            color: theme.primaryText,
                                            fontSize: '0.875rem',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = theme.dangerHover;
                                            e.currentTarget.style.color = '#ffffff';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'none';
                                            e.currentTarget.style.color = theme.primaryText;
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};