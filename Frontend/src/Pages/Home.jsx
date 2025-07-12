import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define reusable theme styles
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

export const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [role, setRole] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("stackit-user"));
        if (user?.role) {
            setRole(user.role);
        }

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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;

        try {
            const res = await fetch(`http://localhost:3000/questions/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();
            alert("Question deleted.");
            setQuestions(prev => prev.filter(q => q._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete the question.");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Placeholder for search functionality
            console.log("Searching for:", searchTerm);
        }
    };

    const filteredQuestions = questions.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.primaryBg,
            color: theme.primaryText,
            padding: '32px 16px',
            fontFamily: theme.fontFamily,
        }}>
            <div style={{ maxWidth: '896px', margin: '0 auto' }}>
                {/* Header Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <h2 style={{
                        fontSize: '2.25rem',
                        fontWeight: '800',
                        background: `linear-gradient(to right, ${theme.secondaryAccent}, ${theme.secondaryAccentHover})`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <i className="bi bi-question-circle-fill" style={{ marginRight: '12px', color: theme.secondaryAccent }}></i>
                        All Questions
                    </h2>
                    <button
                        onClick={() => navigate('/add-question')}
                        style={{
                            padding: '10px 20px',
                            background: theme.accentColor,
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: '600',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                            ':hover': { background: theme.accentHover },
                        }}
                    >
                        <i className="bi bi-plus-circle" style={{ marginRight: '8px' }}></i>
                        Ask a Question
                    </button>
                </div>

                {/* Search Bar */}
                <div style={{
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <input
                        type="text"
                        placeholder="Search questions or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: '1',
                            padding: '12px 16px',
                            background: theme.cardBg,
                            color: theme.primaryText,
                            border: `1px solid ${theme.borderColor}`,
                            borderRadius: '8px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                            ':focus': { borderColor: theme.accentColor },
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            padding: '12px 20px',
                            background: theme.accentColor,
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: '600',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                            ':hover': { background: theme.accentHover },
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>

                {/* Questions List */}
                {filteredQuestions.length === 0 ? (
                    <p style={{
                        fontSize: '1.125rem',
                        color: theme.secondaryText,
                        fontStyle: 'italic',
                        textAlign: 'center',
                        padding: '48px 0',
                        animation: 'pulse 2s infinite',
                    }}>
                        {searchTerm ? "No questions match your search." : "No questions yet. Be the first to ask!"}
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {filteredQuestions.map((q) => (
                            <div
                                key={q._id}
                                style={{
                                    background: theme.cardBg,
                                    backdropFilter: 'blur(4px)',
                                    borderRadius: '12px',
                                    boxShadow: theme.shadow,
                                    transition: 'all 0.3s ease',
                                    border: `1px solid ${theme.borderColor}`,
                                    transform: 'translateY(0)',
                                    ':hover': {
                                        boxShadow: theme.shadowHover,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <div style={{ padding: '24px' }}>
                                    <h5 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>
                                        <Link
                                            to={`/question/${q._id}`}
                                            style={{
                                                color: theme.accentColor,
                                                textDecoration: 'none',
                                                transition: 'color 0.2s ease',
                                                ':hover': { color: theme.accentHover },
                                            }}
                                        >
                                            {q.title}
                                        </Link>
                                    </h5>

                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: theme.secondaryText,
                                        marginBottom: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <i className="bi bi-person-circle" style={{ marginRight: '8px', color: theme.accentColor }}></i>
                                        Asked by <strong style={{ margin: '0 4px', color: theme.primaryText }}>{q.owner?.username || "Unknown"}</strong> •{" "}
                                        {new Date(q.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                        {q.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    display: 'inline-block',
                                                    background: 'rgba(66, 153, 225, 0.3)',
                                                    color: theme.primaryText,
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    padding: '4px 12px',
                                                    borderRadius: '9999px',
                                                    border: `1px solid rgba(66, 153, 225, 0.5)`,
                                                    transition: 'background 0.2s ease',
                                                    ':hover': { background: 'rgba(66, 153, 225, 0.5)' },
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Link
                                            to={`/question/${q._id}`}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '8px 16px',
                                                background: theme.accentColor,
                                                color: '#ffffff',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                borderRadius: '8px',
                                                textDecoration: 'none',
                                                transition: 'background 0.2s ease',
                                                ':hover': { background: theme.accentHover },
                                            }}
                                        >
                                            <i className="bi bi-pencil-square" style={{ marginRight: '8px' }}></i>
                                            Answer
                                        </Link>

                                        {role === "admin" && (
                                            <button
                                                onClick={() => handleDelete(q._id)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    padding: '8px 16px',
                                                    background: `rgba(229, 62, 62, 0.2)`,
                                                    color: theme.dangerColor,
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500',
                                                    borderRadius: '8px',
                                                    border: `1px solid rgba(229, 62, 62, 0.5)`,
                                                    transition: 'background 0.2s ease',
                                                    cursor: 'pointer',
                                                    ':hover': { background: `rgba(229, 62, 62, 0.4)` },
                                                }}
                                            >
                                                <i className="bi bi-trash" style={{ marginRight: '8px' }}></i>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};