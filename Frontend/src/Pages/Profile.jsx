import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    if (loading) return (
        <div style={{
            minHeight: '100vh',
            background: theme.primaryBg,
            color: theme.secondaryText,
            fontFamily: theme.fontFamily,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
            padding: '32px 16px',
        }}>
            Loading profile...
        </div>
    );

    if (!user) return (
        <div style={{
            minHeight: '100vh',
            background: theme.primaryBg,
            color: theme.secondaryText,
            fontFamily: theme.fontFamily,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
            padding: '32px 16px',
        }}>
            User not found.
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
                <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: theme.shadow,
                    border: `1px solid ${theme.borderColor}`,
                }}>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: theme.secondaryAccent,
                        marginBottom: '12px',
                        textAlign: 'center',
                    }}>
                        <i className="bi bi-person-circle" style={{ marginRight: '8px' }}></i>
                        {user.username}
                    </h2>
                    <p style={{
                        fontSize: '0.875rem',
                        color: theme.secondaryText,
                        marginBottom: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <i className="bi bi-envelope" style={{ marginRight: '4px' }}></i>
                        {user.email}
                    </p>
                    <p style={{
                        fontSize: '0.875rem',
                        color: theme.secondaryText,
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <i className="bi bi-calendar-event" style={{ marginRight: '4px' }}></i>
                        Joined on {new Date(user.joined).toLocaleDateString()}
                    </p>

                    <hr style={{ borderColor: theme.borderColor, margin: '24px 0' }} />
                    <h4 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: theme.primaryText,
                        marginBottom: '16px',
                    }}>
                        Your Answers
                    </h4>
                    {user.answers && user.answers.length > 0 ? (
                        user.answers.map((ans, index) => (
                            <div
                                key={index}
                                style={{
                                    background: theme.cardBg,
                                    borderRadius: '12px',
                                    padding: '16px',
                                    boxShadow: theme.shadow,
                                    marginBottom: '16px',
                                    border: `1px solid ${theme.borderColor}`,
                                }}
                            >
                                <h6 style={{
                                    fontSize: '1rem',
                                    color: theme.accentColor,
                                    marginBottom: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <i className="bi bi-question-circle" style={{ marginRight: '4px' }}></i>
                                    {ans.questionId?.title || "Deleted Question"}
                                </h6>
                                <p style={{
                                    fontSize: '1rem',
                                    color: theme.primaryText,
                                    marginBottom: '8px',
                                }}>
                                    {ans.text}
                                </p>
                                <small style={{
                                    fontSize: '0.75rem',
                                    color: theme.secondaryText,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <i className="bi bi-clock" style={{ marginRight: '4px' }}></i>
                                    {new Date(ans.createdAt).toLocaleString()}
                                </small>
                            </div>
                        ))
                    ) : (
                        <p style={{
                            fontSize: '1rem',
                            color: theme.secondaryText,
                            textAlign: 'center',
                        }}>
                            You haven’t answered any questions yet.
                        </p>
                    )}
                </div>

                <hr style={{ borderColor: theme.borderColor, margin: '24px 0' }} />
                <h4 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: theme.primaryText,
                    marginBottom: '16px',
                }}>
                    Questions Asked
                </h4>
                {user.questions.length === 0 ? (
                    <p style={{
                        fontSize: '1rem',
                        color: theme.secondaryText,
                        textAlign: 'center',
                    }}>
                        No questions posted yet.
                    </p>
                ) : (
                    user.questions.map((q, i) => (
                        <div
                            key={i}
                            style={{
                                background: theme.cardBg,
                                borderRadius: '12px',
                                padding: '16px',
                                boxShadow: theme.shadow,
                                marginBottom: '16px',
                                border: `1px solid ${theme.borderColor}`,
                            }}
                        >
                            <h5 style={{
                                fontSize: '1.25rem',
                                color: theme.primaryText,
                                marginBottom: '8px',
                            }}>
                                {q.title}
                            </h5>
                            <p style={{
                                fontSize: '1rem',
                                color: theme.secondaryText,
                                marginBottom: '8px',
                            }}>
                                {q.description}
                            </p>
                            <p style={{
                                fontSize: '0.875rem',
                                color: theme.secondaryText,
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <i className="bi bi-clock" style={{ marginRight: '4px' }}></i>
                                {new Date(q.createdAt).toLocaleString()}
                            </p>

                            <h6 style={{
                                fontSize: '1rem',
                                color: theme.primaryText,
                                marginTop: '16px',
                                marginBottom: '8px',
                            }}>
                                Answers:
                            </h6>
                            {q.answers && q.answers.length > 0 ? (
                                q.answers.map((ans, j) => (
                                    <div
                                        key={j}
                                        style={{
                                            background: 'rgba(66, 153, 225, 0.1)',
                                            borderRadius: '8px',
                                            padding: '8px',
                                            marginBottom: '8px',
                                            border: `1px solid ${theme.borderColor}`,
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '1rem',
                                            color: theme.primaryText,
                                            marginBottom: '4px',
                                        }}>
                                            {ans.text}
                                        </p>
                                        <small style={{
                                            fontSize: '0.75rem',
                                            color: theme.secondaryText,
                                        }}>
                                            by {ans.username} on {new Date(ans.createdAt).toLocaleString()}
                                        </small>
                                    </div>
                                ))
                            ) : (
                                <p style={{
                                    fontSize: '1rem',
                                    color: theme.secondaryText,
                                }}>
                                    No answers yet.
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};