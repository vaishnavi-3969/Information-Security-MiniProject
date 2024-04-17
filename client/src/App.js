// App.js

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users/signup', { username, password });
            console.log(response.data);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error signing up. Please try again.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', { username, password });
            console.log(response.data);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Invalid credentials. Please try again.');
        }
    };

    const handleGetDetails = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users/getdetails', { withCredentials: true });
            console.log(response.data);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error getting user details.');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>

            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            <h1>Get User Details</h1>
            <button onClick={handleGetDetails}>Get Details</button>

            {error && <p>{error}</p>}
        </div>
    );
};

export default App;
