import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="user-icon">
        <FaUserCircle size={30} />
      </div>
    </div>
  );
};

export default Header;
