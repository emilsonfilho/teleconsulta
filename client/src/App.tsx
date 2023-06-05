import React, { useEffect, useState } from 'react';
import Navbar from './layout/Navbar.tsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import InfoPaciente from './pages/InfoPaciente.tsx';
import axios from 'axios';


const App: React.FC = () => {
  interface Paciente {
    paciente_id: number;
    paciente_foto: string;
    paciente_nome: string;
    paciente_dataN: string;
    paciente_cpf: string;
    paciente_telefone: string;
    paciente_atendido: boolean;
  }

  // Hooks
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  // Functions
  const addPaciente = (novoPaciente: Paciente) => {
    setPacientes([...pacientes, novoPaciente]);
  }

  // UseEffects
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getPacientes');
        const result = response.data;
        setPacientes(result);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPacientes();
  })


  return (
    <div className="App">
        <Router>
        <Navbar addPaciente={addPaciente} />
        <Routes>
          <Route path="/" element={<Home pacientes={pacientes} addPaciente={addPaciente} />} />
          <Route path="/infoPaciente/:id" element={<InfoPaciente />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
