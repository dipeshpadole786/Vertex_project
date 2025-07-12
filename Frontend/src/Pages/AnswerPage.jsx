import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const AnswerPage = () => {
    const { id } = useParams(); // question id
    const [question, setQuestion] = useState(null);
    const [newAnswer, setNewAnswer] = useState('');

    const user = JSON.parse(localStorage.getItem('stackit-user'));

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await fetch(`http://localhost:3000/questions/${id}`, {
                    credentials: 'include',
                });
                const data = await res.json();
                setQuestion(data);
            } catch (err) {
                console.error('Error fetching question:', err);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.username) {
            alert("Please log in to submit an answer.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/questions/${id}/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: user.username,
                    text: newAnswer,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Answer submitted!");
                setNewAnswer('');
                setQuestion((prev) => ({
                    ...prev,
                    answers: [...prev.answers, data.answer],
                }));
            } else {
                alert(data.message || 'Failed to post answer.');
            }
        } catch (err) {
            console.error(err);
            alert("Server error.");
        }
    };

    if (!question) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container py-4">
            <h3 className="fw-bold">{question.title}</h3>
            <p className="text-muted">
                <i className="bi bi-person"></i> {question.owner?.username || "Unknown"}
            </p>
            <div className="mb-3">{question.description}</div>

            {/* Tags */}
            <div className="mb-4">
                {question.tags.map((tag, i) => (
                    <span key={i} className="badge bg-secondary me-2">{tag}</span>
                ))}
            </div>

            {/* Answers */}
            <h5 className="mt-4 mb-3">Answers ({question.answers.length})</h5>
            {question.answers.length === 0 ? (
                <p>No answers yet. Be the first to answer!</p>
            ) : (
                question.answers.map((ans, index) => (
                    <div key={index} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <p className="card-text">{ans.text}</p>
                            <p className="text-muted small">
                                <i className="bi bi-person"></i> {ans.username} | {new Date(ans.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))
            )}

            {/* Answer Form */}
            {user ? (
                <form className="mt-4" onSubmit={handleAnswerSubmit}>
                    <h5>Post Your Answer</h5>
                    <textarea
                        className="form-control mb-3"
                        rows="5"
                        placeholder="Write your answer here..."
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        required
                    />
                    <button className="btn btn-success" type="submit">Submit Answer</button>
                </form>
            ) : (
                <p className="text-danger mt-4">You must be logged in to post an answer.</p>
            )}
        </div>
    );
};
