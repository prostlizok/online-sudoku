import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            alert(response.data);
            navigate('/home');
        } catch (error) {
            console.error('There was an error!', error);
            if (error.response) {
                setError(error.response.data);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="username"
                        placeholder="Enter Your Name"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Email / Mobile Number</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Enter Your Email or Mobile Number"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup" style={{ textDecoration: 'none' }}>Signup</a></p>
        </div>
    );
}

export default Login;
