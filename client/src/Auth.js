import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';

const Auth = () => {
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('signup');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
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
            setSuccessMessage('Signup successful!');
            setError('');
            getUsers();
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error(error);
            setError('Error signing up. Please try again.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', { username: loginUsername, password: loginPassword });
            console.log(response.data);
            setSuccessMessage('Login successful!');
            setError('');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error(error);
            setError('Invalid credentials. Please try again.');
        }
    };

    const toggleTab = (tab) => {
        setActiveTab(tab);
        setError('');
        setSuccessMessage('');
    };

    const handlePostMessage = () => {
        // Simulate posting a message to the server
        const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        setMessages([...messages, sanitizedMessage]);
        setMessage(''); // Clear input field
    };

    return (
        <div className="container relative max-w-lg py-20 mx-auto">
            <h1 className="mb-4 text-3xl font-semibold">Welcome to Our Banking Website</h1>

            <div className="mb-6">
                <div className="flex">
                    <button onClick={() => toggleTab('signup')} className={`mr-2 py-2 px-4 rounded ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Signup</button>
                    <button onClick={() => toggleTab('login')} className={`py-2 px-4 rounded ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Login</button>
                    <button onClick={() => toggleTab('users')} className="px-4 py-2 ml-auto text-white bg-green-500 rounded">Show Users</button>
                </div>
            </div>

            {activeTab === 'signup' && (
                <div className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">Signup</h2>
                    <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <button onClick={handleSignup} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Signup</button>
                    {successMessage && (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                            <Confetti />
                            <p className="text-lg font-semibold text-green-500">Signup successful!</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'login' && (
                <div className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">Login</h2>
                    <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <button onClick={handleLogin} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Login</button>
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                    {successMessage && (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                            <Confetti />
                            <p className="text-lg font-semibold text-green-500">Login successful!</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'users' && (
                <div>
                    <h2 className="mb-2 text-xl font-semibold">All Users</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} className="mb-2">
                                <span className="font-semibold">{user.username}</span>: {user.password}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <input
                    type="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handlePostMessage}>Post Message</button>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: msg }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Auth;
