import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define reusable theme styles (consistent with other components)
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

export const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Important for cookie-based login after signup
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Signup successful!");
                navigate("/login"); // Redirect to login after successful signup
            } else {
                alert(data.message || "Signup failed.");
            }
        } catch (error) {
            alert("Server error. Try again later.");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.primaryBg,
            color: theme.primaryText,
            fontFamily: theme.fontFamily,
            padding: '32px 16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{ maxWidth: '400px', width: '100%' }}>
                <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: theme.secondaryAccent,
                    marginBottom: '24px',
                    textAlign: 'center',
                }}>
                    Signup
                </h3>
                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{
                            fontSize: '1rem',
                            color: theme.secondaryText,
                            marginBottom: '8px',
                            display: 'block',
                        }}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: theme.cardBg,
                                color: theme.primaryText,
                                border: `1px solid ${theme.borderColor}`,
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontFamily: theme.fontFamily,
                                outline: 'none',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = theme.accentColor)}
                            onBlur={(e) => (e.target.style.borderColor = theme.borderColor)}
                        />
                    </div>

                    <div>
                        <label style={{
                            fontSize: '1rem',
                            color: theme.secondaryText,
                            marginBottom: '8px',
                            display: 'block',
                        }}>
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: theme.cardBg,
                                color: theme.primaryText,
                                border: `1px solid ${theme.borderColor}`,
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontFamily: theme.fontFamily,
                                outline: 'none',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = theme.accentColor)}
                            onBlur={(e) => (e.target.style.borderColor = theme.borderColor)}
                        />
                    </div>

                    <div>
                        <label style={{
                            fontSize: '1rem',
                            color: theme.secondaryText,
                            marginBottom: '8px',
                            display: 'block',
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: theme.cardBg,
                                color: theme.primaryText,
                                border: `1px solid ${theme.borderColor}`,
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontFamily: theme.fontFamily,
                                outline: 'none',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = theme.accentColor)}
                            onBlur={(e) => (e.target.style.borderColor = theme.borderColor)}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '12px',
                            background: theme.accentColor,
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: '600',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                        }}
                        onMouseOver={(e) => (e.target.style.background = theme.accentHover)}
                        onMouseOut={(e) => (e.target.style.background = theme.accentColor)}
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};