import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file
import landingImage from './log.svg';
const LandingPage = () => {
    const navigate = useNavigate(); 

    return (
        <div className="landing-container">
              <img src={landingImage} alt="Landing Visual" className="landing-image" />
            <h1>Explore New Interactive Authentication</h1>
            <div className="button-container">
                <button onClick={() => navigate('/login')} className="landing-button">Login</button>
                <button onClick={() => navigate('/register')} className="landing-button">Register</button>
            </div>
        </div>
    );
};

export default LandingPage;
