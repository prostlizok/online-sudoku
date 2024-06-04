import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Register';
import Home from './pages/Home';
import Game from './pages/Game';
import './pages/style.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/game" element={<Game />} /> 
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;