import React, { useState } from 'react';
import styles from './CadastrarPaciente.module.css';
import { Button as BootstrapButton, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Input from '../form/Input';
import axios from 'axios';

const Button: React.FC = () => {  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [paciente, setPaciente] = useState<any>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaciente({...paciente, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(paciente);
        console.log(paciente.paciente_nome);
        

        const formData = new FormData();
        for (const key in paciente) {
            if (paciente.hasOwnProperty(key)) {
              formData.append(key, paciente[key]);
            }
          }

        axios.post('http://localhost:8000/pacientes/cadastrarPaciente', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
            handleClose();
        }).catch(err => console.log(err));
    }

    
    return (
        <>
            <BootstrapButton variant='info' className={styles.btn} onClick={handleShow}>Cadastrar Paciente</BootstrapButton>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de Pacientes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form>
                            {/*
                            
                            <Form.Text className='text-muted'>
                                O nome do paciente deve ser informado.
                            </Form.Text>

                            Isso vai ser interessante para mostrar os resultados assim que o user vai registrar uma consulta.
                            Guarde isso

                            */}
                        <Input type='text' name='paciente_nome' label='Nome completo' placeholder='Nome completo' handleChange={handleChange} />
                        <Input type='date' name='paciente_dataN' label='Data de Nascimento' placeholder='' handleChange={handleChange} />
                        <Input  type='text' name='paciente_cpf' label='CPF' placeholder='CPF do paciente' handleChange={handleChange} />
                        <Input type='tel' name='paciente_telefone' label='Número de telefone' placeholder='(00) 9.9999-9999' handleChange={handleChange} />
                        <Input type='file' name='paciente_foto' label='Foto' placeholder='' handleChange={handleChange} />
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/">
                        <BootstrapButton variant='info' className={styles.btn} onClick={handleSubmit}>Finalizar</BootstrapButton>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Button;