import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Required for session cookie
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                // ✅ Save full user object (username + role)
                localStorage.setItem("stackit-user", JSON.stringify(data.user));

                alert("Login successful!");
                navigate("/home");
            } else {
                alert(data.message || "Login failed.");
            }
        } catch (error) {
            alert("Server error. Try again later.");
        }
    };


    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="mb-3 text-center">Login</h3>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
};
