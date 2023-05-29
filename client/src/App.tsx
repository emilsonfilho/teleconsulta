import React from 'react';
import Navbar from './layout/Navbar.tsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import InfoPaciente from './pages/InfoPaciente.tsx';


const App: React.FC = () => {
  return (
    <div className="App">
        <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/infoPaciente/" element={<InfoPaciente />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
