import React from 'react';
import FileUpload from './FileUpload';
import QRCodeDisplay from './QRCodeDisplay';

const Dashboard = () => {
  return (
    <div>
      <h1>Your Dashboard</h1>
      <FileUpload />
      <QRCodeDisplay />
    </div>
  );
};

export default Dashboard;
