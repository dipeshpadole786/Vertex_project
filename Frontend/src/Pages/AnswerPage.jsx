import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

export const AnswerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
                console.error('❌ Error fetching question:', err);
            }
        };
        fetchQuestion();
    }, [id]);

    const handleVote = async (answerId, type) => {
        try {
            const res = await fetch(`http://localhost:3000/questions/${id}/answers/${answerId}/vote`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ type }),
            });

            const data = await res.json();

            if (res.ok) {
                setQuestion((prev) => ({
                    ...prev,
                    answers: prev.answers.map((ans) =>
                        ans._id === answerId
                            ? { ...ans, agreeVotes: data.agreeVotes, disagreeVotes: data.disagreeVotes }
                            : ans
                    ),
                }));
            } else {
                alert(data.message || '❌ Vote failed');
            }
        } catch (err) {
            console.error('❌ Vote error:', err);
        }
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("⚠️ Please log in to submit an answer.");
            navigate('/login');
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
                alert("✅ Answer submitted!");
                setNewAnswer('');
                setQuestion((prev) => ({
                    ...prev,
                    answers: [
                        ...prev.answers,
                        {
                            _id: data.answer._id,
                            username: user.username,
                            text: newAnswer,
                            createdAt: new Date().toISOString(),
                            agreeVotes: 0,
                            disagreeVotes: 0,
                        },
                    ],
                }));
            } else {
                alert(data.message || '❌ Failed to post answer.');
            }
        } catch (err) {
            console.error('❌ Server error:', err);
            alert("❌ Error connecting to server.");
        }
    };

    if (!question) return (
        <div style={{
            minHeight: '100vh',
            background: theme.primaryBg,
            color: theme.secondaryText,
            fontFamily: theme.fontFamily,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
            animation: 'pulse 2s infinite',
        }}>
            Loading...
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.primaryBg,
            color: theme.primaryText,
            fontFamily: theme.fontFamily,
            padding: '32px 16px',
        }}>
            <div style={{ maxWidth: '896px', margin: '0 auto' }}>
                <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: theme.secondaryAccent,
                    marginBottom: '12px',
                }}>
                    {question.title}
                </h3>
                <p style={{
                    fontSize: '0.875rem',
                    color: theme.secondaryText,
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}>
                    <i className="bi bi-person" style={{ marginRight: '8px', color: theme.accentColor }}></i>
                    {question.owner?.username || "Unknown"}
                </p>
                <div style={{
                    fontSize: '1rem',
                    color: theme.primaryText,
                    marginBottom: '24px',
                    lineHeight: '1.6',
                    padding: '16px',
                    background: theme.cardBg,
                    borderRadius: '8px',
                    border: `1px solid ${theme.borderColor}`,
                    boxShadow: theme.shadow,
                }}>
                    {question.description}
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '24px',
                }}>
                    {question.tags.map((tag, i) => (
                        <span
                            key={i}
                            style={{
                                background: 'rgba(66, 153, 225, 0.3)',
                                color: theme.primaryText,
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                border: `1px solid rgba(66, 153, 225, 0.5)`,
                                cursor: 'default',
                            }}
                            onMouseOver={(e) => (e.target.style.background = 'rgba(66, 153, 225, 0.5)')}
                            onMouseOut={(e) => (e.target.style.background = 'rgba(66, 153, 225, 0.3)')}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h5 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: theme.primaryText,
                    margin: '24px 0 16px',
                }}>
                    Answers ({question.answers.length})
                </h5>
                {question.answers.length === 0 ? (
                    <p style={{
                        fontSize: '1rem',
                        color: theme.secondaryText,
                        textAlign: 'center',
                        padding: '16px',
                        fontStyle: 'italic',
                    }}>
                        No answers yet. Be the first to answer!
                    </p>
                ) : (
                    question.answers.map((ans) => {
                        const totalVotes = (ans.agreeVotes || 0) + (ans.disagreeVotes || 0);
                        const agreePercent = totalVotes ? Math.round((ans.agreeVotes / totalVotes) * 100) : 0;
                        const disagreePercent = totalVotes ? 100 - agreePercent : 0;

                        return (
                            <div
                                key={ans._id}
                                style={{
                                    background: theme.cardBg,
                                    borderRadius: '12px',
                                    border: `1px solid ${theme.borderColor}`,
                                    boxShadow: theme.shadow,
                                    marginBottom: '16px',
                                    padding: '24px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.boxShadow = theme.shadowHover;
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.boxShadow = theme.shadow;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <p style={{
                                    fontSize: '1rem',
                                    color: theme.primaryText,
                                    marginBottom: '12px',
                                    lineHeight: '1.6',
                                }}>
                                    {ans.text}
                                </p>
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: theme.secondaryText,
                                    marginBottom: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <i className="bi bi-person" style={{ marginRight: '8px', color: theme.accentColor }}></i>
                                    {ans.username} | {new Date(ans.createdAt).toLocaleString()}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '12px',
                                }}>
                                    <button
                                        onClick={() => handleVote(ans._id, 'agree')}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'none',
                                            border: `1px solid ${theme.accentColor}`,
                                            color: theme.accentColor,
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = theme.accentColor;
                                            e.target.style.color = '#ffffff';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'none';
                                            e.target.style.color = theme.accentColor;
                                        }}
                                    >
                                        <i className="bi bi-hand-thumbs-up" style={{ marginRight: '4px' }}></i>
                                        Agree
                                    </button>
                                    <button
                                        onClick={() => handleVote(ans._id, 'disagree')}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'none',
                                            border: `1px solid ${theme.dangerColor}`,
                                            color: theme.dangerColor,
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = theme.dangerColor;
                                            e.target.style.color = '#ffffff';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'none';
                                            e.target.style.color = theme.dangerColor;
                                        }}
                                    >
                                        <i className="bi bi-hand-thumbs-down" style={{ marginRight: '4px' }}></i>
                                        Disagree
                                    </button>
                                </div>
                                {totalVotes > 0 && (
                                    <div style={{
                                        display: 'flex',
                                        height: '20px',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        background: theme.borderColor,
                                        marginBottom: '8px',
                                    }}>
                                        <div
                                            style={{
                                                width: `${agreePercent}%`,
                                                background: theme.accentColor,
                                                color: '#ffffff',
                                                fontSize: '0.75rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'width 0.3s ease',
                                            }}
                                        >
                                            {agreePercent}% Agree
                                        </div>
                                        <div
                                            style={{
                                                width: `${disagreePercent}%`,
                                                background: theme.dangerColor,
                                                color: '#ffffff',
                                                fontSize: '0.75rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'width 0.3s ease',
                                            }}
                                        >
                                            {disagreePercent}% Disagree
                                        </div>
                                    </div>
                                )}
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: theme.secondaryText,
                                }}>
                                    {ans.agreeVotes || 0} people agreed, {ans.disagreeVotes || 0} disagreed.
                                </div>
                            </div>
                        );
                    })
                )}
                {user ? (
                    <form
                        onSubmit={handleAnswerSubmit}
                        style={{
                            marginTop: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <h5 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: theme.primaryText,
                        }}>
                            Post Your Answer
                        </h5>
                        <textarea
                            rows="5"
                            placeholder="Write your answer here..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
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
                                resize: 'vertical',
                                outline: 'none',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = theme.accentColor)}
                            onBlur={(e) => (e.target.style.borderColor = theme.borderColor)}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                background: theme.accentColor,
                                color: '#ffffff',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                alignSelf: 'flex-start',
                            }}
                            onMouseOver={(e) => (e.target.style.background = theme.accentHover)}
                            onMouseOut={(e) => (e.target.style.background = theme.accentColor)}
                        >
                            Submit Answer
                        </button>
                    </form>
                ) : (
                    <p style={{
                        fontSize: '1rem',
                        color: theme.dangerColor,
                        marginTop: '24px',
                    }}>
                        You must be logged in to post an answer.
                    </p>
                )}
            </div>
        </div>
    );
};