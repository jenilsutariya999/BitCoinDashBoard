import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboardss from './components/Dashboards';
import Transactions from './components/Transactions';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <Router basename="/BitCoinDashBoard">
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          
        
          <Routes>
            <Route path="/dashboard" element={<Dashboardss />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/" element={<Dashboardss />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
