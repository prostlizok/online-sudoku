import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Adjust the import based on your file structure

const Home = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/game');
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome Home</h1>
      <button onClick={handleNewGame} className="home-button">Start New Game</button>
      <button onClick={handleLogout} className="home-button">Logout</button>
    </div>
  );
};

export default Home;
