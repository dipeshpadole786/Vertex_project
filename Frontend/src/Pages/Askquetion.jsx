import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    username: user.username, // 👈 Send username
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
                navigate('/');
            } else {
                alert(data.message || 'Failed to post question.');
            }
        } catch (error) {
            alert('Error connecting to server.');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 fw-bold">Ask a New Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Short and descriptive title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Enter detailed question here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Tags</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. react, jwt"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-warning">Submit Question</button>
            </form>
        </div>
    );
};
