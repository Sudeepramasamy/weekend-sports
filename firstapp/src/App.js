import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Turf from './components/Turf';
import Bookingpage from './components/Bookingpage';
import Register from './components/Register';
import Login from './components/Login';
import ContactForm from './components/ContactForm';



function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turf" element={<Turf />} />
          <Route path="/booking/:turfId" element={<Bookingpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
