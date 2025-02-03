import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './componenets/Navbar';
import Home from './componenets/Home';
import Turf from './componenets/Turf';
import Bookingpage from './componenets/Bookingpage';
import Register from './componenets/Register';
import Login from './componenets/Login';
import ContactForm from './componenets/ContactForm';



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
