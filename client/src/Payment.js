import React, { useState } from 'react';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate payment processing
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cardNumber, expiryDate, cvv }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setErrorMessage('An error occurred while processing your payment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
            <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCVV(e.target.value)} required />
            <button type="submit">Pay Now</button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    );
};

export default PaymentForm;
