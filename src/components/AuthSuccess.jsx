// AuthSuccess.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const AuthSuccess = () => {
    const location = useLocation(); // Get the current location
    const { username } = location.state || {}; // Extract username from the state passed during navigation

    return (
        <center>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1
  style={{
    marginRight: '-1%',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',   
  }}
>
  Hello, {username}!
</h1>


            <p>You have Successfully Explored New Authentication</p>
            <p>Welcome to the application!</p>
           
        </div>
        </center>
    );
};

export default AuthSuccess;