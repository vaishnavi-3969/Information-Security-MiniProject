import React, { useState } from 'react';

const Actions = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleAddBalance = () => {
        if (!amount || isNaN(amount)) {
            setError('Please enter a valid amount.');
            return;
        }

        const newBalance = balance + parseFloat(amount);
        setBalance(newBalance);
        setAmount('');
        setError('');
    };

    const handleWithdraw = () => {
        if (!amount || isNaN(amount)) {
            setError('Please enter a valid amount.');
            return;
        }

        if (parseFloat(amount) > balance) {
            setError('Insufficient funds.');
            return;
        }

        const newBalance = balance - parseFloat(amount);
        setBalance(newBalance);
        setAmount('');
        setError('');
    };

    const handlePayment = () => {
        window.location.href="/payment"
    }

    return (
        <div className="container max-w-md py-10 mx-auto">
            <h1 className="mb-4 text-3xl font-semibold">Bank Actions</h1>
            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    className="w-full p-2 mt-1 mb-2 border border-gray-300 rounded"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex space-x-4">
                <button onClick={handleAddBalance} className="flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add Balance</button>
                <button onClick={handleWithdraw} className="flex-1 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Withdraw</button>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Current Balance:</h2>
                <p className="text-2xl font-bold">{balance} USD</p>
            </div>
            <button onClick={handlePayment} className="flex-1 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Go to Payments</button>
        </div>
    );
};

export default Actions;
