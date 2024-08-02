import React, { useEffect, useState } from 'react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Retrieve the JWT token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    // Handle the case when the token is missing
                    throw new Error('No token found, please log in');
                }

                const res = await fetch('http://localhost:8080/transactions', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
                    },
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();

                setTransactions(data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="border rounded p-4">
                            <p><strong>Transaction ID:</strong> {transaction.id}</p>
                            <p><strong>Amount:</strong> ${parseFloat(transaction.amount)}</p>
                            <p><strong>Date:</strong> {new Date(transaction.created_at).toLocaleString()}</p>
                            <p><strong>Status:</strong> {transaction.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Transactions;
