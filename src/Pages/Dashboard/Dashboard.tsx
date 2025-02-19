import Navbar from '../../components/Navbar/Navbar';
import Home from '../../components/Home/Home';
import Footer from '../../components/Footer/Footer';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default Dashboard;
