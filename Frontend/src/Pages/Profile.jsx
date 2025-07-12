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
                <hr />
                <h4 className="mt-4 mb-3">Your Answers</h4>
                {user.answers && user.answers.length > 0 ? (
                    user.answers.map((ans, index) => (
                        <div key={index} className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h6 className="text-primary">
                                    <i className="bi bi-question-circle me-1"></i>
                                    {ans.questionId?.title || "Deleted Question"}
                                </h6>
                                <p className="mb-1">{ans.text}</p>
                                <small className="text-muted">
                                    <i className="bi bi-clock me-1"></i>
                                    {new Date(ans.createdAt).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">You haven’t answered any questions yet.</p>
                )}


            </div>
            <hr />
            <h4 className="mt-4">Questions Asked</h4>
            {user.questions.length === 0 ? (
                <p className="text-muted">No questions posted yet.</p>
            ) : (
                user.questions.map((q, i) => (
                    <div key={i} className="card mb-3 p-3">
                        <h5>{q.title}</h5>
                        <p className="text-muted">{q.description}</p>
                        <p className="text-muted"><i className="bi bi-clock"></i> {new Date(q.createdAt).toLocaleString()}</p>

                        <h6 className="mt-2">Answers:</h6>
                        {q.answers && q.answers.length > 0 ? (
                            q.answers.map((ans, j) => (
                                <div key={j} className="border rounded p-2 mb-2 bg-light">
                                    <p className="mb-1">{ans.text}</p>
                                    <small className="text-muted">by {ans.username} on {new Date(ans.createdAt).toLocaleString()}</small>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No answers yet.</p>
                        )}
                    </div>
                ))
            )}


        </div>
    );
};
