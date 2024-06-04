import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleNewGame = () => {
        navigate('/game');
    };

    return (
        <div>
            <h1>Welcome Home</h1>
            <p>&nbsp;<a href="/login" style={{ textDecoration: 'none' }}>Logout</a></p>
            <button onClick={handleNewGame} style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#3399ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Start New Game</button>
        </div>
    );
}

export default Home;
