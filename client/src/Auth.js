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

    return (
        <div className="container mx-auto max-w-lg relative py-20">
            <h1 className="text-3xl font-semibold mb-4">Welcome to Our Banking Website</h1>

            <div className="mb-6">
                <div className="flex">
                    <button onClick={() => toggleTab('signup')} className={`mr-2 py-2 px-4 rounded ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Signup</button>
                    <button onClick={() => toggleTab('login')} className={`py-2 px-4 rounded ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Login</button>
                    <button onClick={() => toggleTab('users')} className="ml-auto py-2 px-4 rounded bg-green-500 text-white">Show Users</button>
                </div>
            </div>

            {activeTab === 'signup' && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Signup</h2>
                    <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Signup</button>
                    {successMessage && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <Confetti />
                            <p className="text-green-500 text-lg font-semibold">Signup successful!</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'login' && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Login</h2>
                    <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full p-2 mb-2 border border-gray-300 rounded" />
                    <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <Confetti /> 
                            <p className="text-green-500 text-lg font-semibold">Login successful!</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'users' && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">All Users</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} className="mb-2">
                                <span className="font-semibold">{user.username}</span>: {user.password}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Auth;
