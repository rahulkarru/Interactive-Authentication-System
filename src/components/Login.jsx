import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import landingImage from './log.svg';
const Login = ({ shapeData }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !shapeData) {
            setError('Please enter your username and draw something.');
            return;
        }

        try {
            // Send shape data to the backend during login for authentication
            const response = await axios.post('http://localhost:5002/api/login', {
                username,
                shapeData
            });

            if (response.status === 200) {
                navigate('/authsuccess', { state: { username } });
            }
        } catch (error) {
            setError('Invalid username or shape data.');
        }
    };

    return (
        <div className="login-containter">
             <img src={landingImage} alt="Landing Visual" className="landing-image" />
            <h3>Login</h3>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}

            {}
            <button onClick={() => navigate('/drawcanvas')} style={{ marginTop: '10px' }}>
                Go to Draw Canvas
            </button>
        </div>
    );
};

export default Login;
