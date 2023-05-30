import React from "react";
import { Container } from "react-bootstrap";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CadastrarPaciente from "../components/CadastrarPaciente";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

type Paciente = {
  paciente_id: number;
  paciente_foto: string;
  paciente_nome: string;
  paciente_dataN: string;
  paciente_cpf: string;
  paciente_telefone: string;
  paciente_atendido: boolean;
}

interface NavbarProps {
  addPaciente: (novoPaciente: Paciente) => void
}

const Navbar: React.FC<NavbarProps> = ({ addPaciente }) => {
    
    return (
        <BootstrapNavbar bg="light" variant="light">
            <Container>
                <BootstrapNavbar.Brand>
                    <Link to='/' className={styles.name}>
                    <strong>TeleConsulta</strong>
                    </Link>
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle />
                <BootstrapNavbar.Collapse className="justify-content-end">
                    <BootstrapNavbar.Text>
                        <CadastrarPaciente addPaciente={addPaciente} />
                    </BootstrapNavbar.Text>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
   );
};

export default Navbar;