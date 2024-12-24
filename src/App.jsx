import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import DrawCanvas from './components/DrawCanvas';
import Register from './components/Register';
import AuthSuccess from './components/AuthSuccess';

const App = () => {
    const [temporaryShapeData, setTemporaryShapeData] = useState(null); // Temporary field to store shape data

    const handleShapeSubmission = (data) => {
        setTemporaryShapeData(data);  // Store shape data temporarily
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login shapeData={temporaryShapeData} />} />
                <Route
                    path="/drawcanvas"
                    element={<DrawCanvas onSubmitShapes={handleShapeSubmission} />}
                />
                <Route path="/register" element={<Register shapeData={temporaryShapeData} />} />
                <Route path="/authsuccess" element={<AuthSuccess />} /> {/* Add the AuthSuccess route */}
            </Routes>
        </Router>
    );
};

export default App;
