import React, { useState } from 'react';
import styles from './CadastrarPaciente.module.css';
import { Button as BootstrapButton, Modal, Form } from 'react-bootstrap';
import Input from '../form/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Paciente = {
  paciente_id: number;
  paciente_foto: string;
  paciente_nome: string;
  paciente_dataN: string;
  paciente_cpf: string;
  paciente_telefone: string;
  paciente_atendido: boolean;
};

interface CadastrarPacienteProps {
  addPaciente: (novoPaciente: Paciente) => void;
}

const CadastrarPaciente: React.FC<CadastrarPacienteProps> = ({ addPaciente }) => {
  // Hooks
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paciente, setPaciente] = useState<Paciente>({
    paciente_id: 0,
    paciente_foto: '',
    paciente_nome: '',
    paciente_dataN: '',
    paciente_cpf: '',
    paciente_telefone: '',
    paciente_atendido: false,
  });

  // Functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaciente({ ...paciente, paciente_foto: file.name });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    if (!paciente.paciente_nome || !paciente.paciente_dataN || !paciente.paciente_cpf || !paciente.paciente_telefone) {
      setValidated(true);
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    const formData = new FormData(form);
    axios
      .post('http://localhost:8000/pacientes/cadastrarPaciente', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        handleClose();
        addPaciente(paciente);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <BootstrapButton variant="info" className={styles.btn} onClick={handleShow}>
        Cadastrar Paciente
      </BootstrapButton>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Pacientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
            <Input
              type="text"
              name="paciente_nome"
              label="Nome completo"
              placeholder="Nome completo"
              handleChange={handleChange}
              required
            />
            <Input
              type="date"
              name="paciente_dataN"
              label="Data de Nascimento"
              placeholder=""
              handleChange={handleChange}
              required
          />
          <Input
            type="text"
            name="paciente_cpf"
            label="CPF"
            placeholder="CPF"
            handleChange={handleChange}
            required
            mask='000.000.000-00'
          />
          <Input
            type="tel"
            name="paciente_telefone"
            label="Telefone"
            placeholder="Telefone"
            handleChange={handleChange}
            required
            mask='(00) 0.0000-0000'
          />
          <Input
            type="file"
            name="paciente_foto"
            label="Foto"
            placeholder="Selecione uma foto"
            handleChange={handleFileChange}
            required
          />
          {validated && (
            <div className={styles.error}>
              <p>{errorMessage}</p>
            </div>
          )}
          <div className={styles.buttonsContainer}>
            <BootstrapButton variant="primary" type="submit" className={styles.btn}>
              Cadastrar
            </BootstrapButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  </>
);
};

export default CadastrarPaciente;

