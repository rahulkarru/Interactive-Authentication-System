import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import the App component
import './index.css';     // Optional, for styling

// Render the App component to the root element in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
