import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="mb-3 text-center">Signup</h3>
            <form onSubmit={handleSignup}>
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
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
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

                <button type="submit" className="btn btn-success w-100">
                    Signup
                </button>
            </form>
        </div>
    );
};
