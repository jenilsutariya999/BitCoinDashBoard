import React, { useEffect, useState } from 'react';
import './Transaction.css';

const Transaction = () => {
  const [transactions, setTransactions] = useState([
    { id: 'HDB2NA2H', date: '2022-06-09', type: 'INR Deposit', amount: '+ ₹81,123.10', status: 'Pending' },
    { id: 'HDB2NA2H', date: '2022-06-07', type: 'INR Withdraw', amount: '- ₹81,123.10', status: 'Processing' },
    { id: 'HDB2NA2H', date: '2022-06-04', type: 'Buy', amount: '+ 12.48513391 BTC', status: 'Cancelled' },
    { id: 'HDB2NA2H', date: '2022-06-03', type: 'Sell', amount: '- 0.36401628 BTC', status: 'Completed' },
    { id: 'HDB2NA2H', date: '2022-06-03', type: 'BTC Deposit', amount: '+ 4.113946104 BTC', status: 'Completed' },
  ]);

  const [livePrice, setLivePrice] = useState(null);

  // Function to fetch live price data
  const fetchLivePrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr');
      const data = await response.json();
      setLivePrice(data.bitcoin.inr);
    } catch (error) {
      console.error('Error fetching live price:', error);
    }
  };

  useEffect(() => {
    fetchLivePrice();
    const intervalId = setInterval(() => {
      fetchLivePrice(); 
    }, 10000);


    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Transactions</h2>
      

      <div className="live-price">
        <h3>Live Bitcoin Price: {livePrice ? `₹${livePrice}` : 'Loading...'}</h3>
      </div>
      
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
