import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; 
import landingImage from './register.svg';
const Register = ({ shapeData }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !email || !shapeData) {
            setError('Please fill in all fields and draw something.');
            return;
        }

        try {
            // Send shapeData (the drawn shape) to the backend
            const response = await axios.post('http://localhost:5002/api/register', {
                username,
                email,
                shapeData
            });

            if (response.status === 201) {
                navigate('/login')
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-containter">
              <img src={landingImage} alt="Landing Visual" className="landing-image" />
            <h3>Create Your Account</h3>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
           <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(inputEmail)) {
      setError(''); // Clear error if email is valid
    } else {
      setError('Invalid email format'); // Set error if email is invalid
    }
  }}
/>

            <button onClick={handleRegister}>Register</button>
            {error && <p>{error}</p>}
            {/* Button to navigate to DrawCanvas page */}
            <button onClick={() => navigate('/drawcanvas')} style={{ marginTop: '10px' }}>
                Go to Draw Canvas
            </button>
        </div>
    );
};

export default Register;
