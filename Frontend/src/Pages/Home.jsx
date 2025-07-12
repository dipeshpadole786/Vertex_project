import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch('http://localhost:3000/questions', {
                    credentials: 'include',
                });
                const data = await res.json();
                setQuestions(data);
            } catch (err) {
                console.error('Error fetching questions:', err);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <div className="container py-4">
            <h2 className="fw-bold mb-4 text-warning">
                <i className="bi bi-question-circle-fill me-2"></i>All Questions
            </h2>

            {questions.length === 0 ? (
                <p>No questions yet. Be the first to ask!</p>
            ) : (
                questions.map((q) => (
                    <div className="card mb-3 shadow-sm" key={q._id}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/question/${q._id}`} className="text-decoration-none text-dark">
                                    {q.title}
                                </Link>
                            </h5>

                            <p className="card-text text-muted mb-2">
                                <i className="bi bi-person-circle me-1"></i>
                                Asked by <strong>{q.owner?.username || "Unknown"}</strong> •{" "}
                                {new Date(q.createdAt).toLocaleDateString()}
                            </p>

                            {/* Tags */}
                            <div className="mb-3">
                                {q.tags.map((tag, i) => (
                                    <span key={i} className="badge bg-secondary me-2">{tag}</span>
                                ))}
                            </div>

                            <Link to={`/question/${q._id}`} className="btn btn-outline-primary btn-sm">
                                <i className="bi bi-pencil-square me-1"></i> Answer
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
