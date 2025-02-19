import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Home from '../../components/Home/Home';
import Footer from '../../components/Footer/Footer';


function Dashboard() {

  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default Dashboard;
