import React, { useState , useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import './Dashboard.css'; 

const data1H = [
  { time: '7:15 PM', price: 26500 },
  { time: '7:45 PM', price: 26600 },
  { time: '8:15 PM', price: 26650 },
  { time: '8:45 PM', price: 26700 },
  { time: '9:15 PM', price: 26750 },
];

const data1D = [
  { time: '7:15 AM', price: 26500 },
  { time: '12:55 PM', price: 26600 },
  { time: '6:35 PM', price: 26400 },
  { time: '7:15 PM', price: 26300 },
];

const Dashboard = () => {
  const [livePrice, setLivePrice] = useState(null);
  const [timeRange, setTimeRange] = useState('1H');
  const [chartData, setChartData] = useState(data1H);

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


  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    switch (range) {
      case '1H':
        setChartData(data1H);
        break;
      case '1D':
        setChartData(data1D);
        break;
      case '1W':
        
        break;
      case '1M':
      
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard">
      <div className="current-price-section">
      <h3>Live Bitcoin Price: {livePrice ? `₹${livePrice}` : 'Loading...'}</h3>
        <button className="buy-btn">Buy</button>
        <button className="sell-btn">Sell</button>
      </div>

      <div className="time-range-buttons">
        <button onClick={() => handleTimeRangeChange('1H')} 
        className={timeRange === '1H' ? 'active' : ''}>1H</button>
        <button onClick={() => handleTimeRangeChange('1D')} 
        className={timeRange === '1D' ? 'active' : ''}>1D</button>
        <button onClick={() => handleTimeRangeChange('1W')} 
        className={timeRange === '1W' ? 'active' : ''}>1W</button>
        <button onClick={() => handleTimeRangeChange('1M')} 
        className={timeRange === '1M' ? 'active' : ''}>1M</button>
      </div>

      <div className="graph-section">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#7d4cdb" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
