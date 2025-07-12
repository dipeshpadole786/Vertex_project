import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/user/${username}`, {
                    credentials: "include"
                });

                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                } else {
                    alert(data.message || "Failed to load profile");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    if (loading) return <div className="container py-5 text-center">Loading profile...</div>;

    if (!user) return <div className="container py-5 text-center">User not found.</div>;

    return (
        <div className="container py-5">
            <div className="card shadow border-0 p-4">
                <h2 className="text-center mb-3 text-warning"><i className="bi bi-person-circle me-2"></i>{user.username}</h2>
                <p className="text-muted text-center mb-1"><i className="bi bi-envelope me-1"></i>{user.email}</p>
                <p className="text-muted text-center"><i className="bi bi-calendar-event me-1"></i>Joined on {new Date(user.joined).toLocaleDateString()}</p>

                <hr />


            </div>
        </div>
    );
};
