import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export const AskQuestion = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const user = JSON.parse(localStorage.getItem("stackit-user"));

    useEffect(() => {
        if (!user || !user.username) {
            alert("You must be logged in to ask a question.");
            navigate("/login");
        }
    }, [navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: user.username,
                    title,
                    description,
                    tags: tags.split(',').map(tag => tag.trim()),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Question submitted successfully!');
                setTitle('');
                setDescription('');
                setTags('');
                navigate('/home');
            } else {
                alert(data.message || 'Failed to post question.');
            }
        } catch (error) {
            alert('Error connecting to server.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: theme.primaryBg,
            color: theme.primaryText,
            fontFamily: theme.fontFamily,
            padding: '32px 16px',
        }}>
            <div style={{ maxWidth: '896px', margin: '0 auto' }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: theme.secondaryAccent,
                    marginBottom: '24px',
                }}>
                    Ask a New Question
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{
                            fontSize: '1rem',
                            color: theme.secondaryText,
                            marginBottom: '8px',
                            display: 'block',
                        }}>
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Short and descriptive title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            Description
                        </label>
                        <textarea
                            rows="6"
                            placeholder="Enter detailed question here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                    </div>

                    <div>
                        <label style={{
                            fontSize: '1rem',
                            color: theme.secondaryText,
                            marginBottom: '8px',
                            display: 'block',
                        }}>
                            Tags
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. react, jwt"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
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
                            padding: '8px 16px',
                            background: theme.secondaryAccent,
                            color: '#1a202c',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            alignSelf: 'flex-start',
                        }}
                        onMouseOver={(e) => (e.target.style.background = theme.secondaryAccentHover)}
                        onMouseOut={(e) => (e.target.style.background = theme.secondaryAccent)}
                    >
                        Submit Question
                    </button>
                </form>
            </div>
        </div>
    );
};