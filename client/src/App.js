import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users when the component mounts
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users/signup', { username: signupUsername, password: signupPassword });
            console.log(response.data);
            // Refresh the list of users after signing up
            getUsers();
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error signing up. Please try again.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', { username: loginUsername, password: loginPassword });
            console.log(response.data);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>

            <h1>Login</h1>
            <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            {error && <p>{error}</p>}

            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username}: {user.password}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
