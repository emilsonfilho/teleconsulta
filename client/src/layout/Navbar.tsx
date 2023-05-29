import React from "react";
import { Container } from "react-bootstrap";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CadastrarPaciente from "../components/CadastrarPaciente";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
    
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
                        <CadastrarPaciente />
                    </BootstrapNavbar.Text>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
   );/*
   return (
    <BootstrapNavbar>
      <Container>
        <BootstrapNavbar.Brand href="#home">BootstrapNavbar with text</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className="justify-content-end">
          <BootstrapNavbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </BootstrapNavbar.Text>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );*/

};

export default Navbar;