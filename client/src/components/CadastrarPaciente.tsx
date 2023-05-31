/*import React, { useState } from 'react';
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
}

interface CadastrarPacienteProps {
    addPaciente: (novoPaciente: Paciente) => void
}

const CadastrarPaciente: React.FC<CadastrarPacienteProps> = ({ addPaciente }) => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Informe o CPF");
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const navigate = useNavigate();
    
    const [paciente, setPaciente] = useState<any>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaciente({...paciente, [name]: value });
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPaciente({ ...paciente, paciente_foto: file });
        }
      };
    
    
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
            addPaciente(paciente);
            navigate('/');
        }).catch(err => {
            console.log(err)
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMessage(err.response.data.error)
            }
        });
    }


    return (
        <>
            <BootstrapButton variant='info' className={styles.btn} onClick={handleShow}>Cadastrar Paciente</BootstrapButton>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de Pacientes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form noValidate validated={validated} onSubmit={handleSubmit} encType='multipart/form-data'>
                            {
                            
                            <Form.Text className='text-muted'>
                                O nome do paciente deve ser informado.
                            </Form.Text>
    
                            Isso vai ser interessante para mostrar os resultados assim que o user vai registrar uma consulta.
                            Guarde isso
    
                            }
                        <Input type='text' name='paciente_nome' label='Nome completo' placeholder='Nome completo' handleChange={handleChange} isInvalid={validated && !paciente.paciente_nome} errorMessage="Informe o nome do paciente" />
                        <Input type='date' name='paciente_dataN' label='Data de Nascimento' placeholder='' handleChange={handleChange} isInvalid={validated && !paciente.paciente_dataN} errorMessage="Informe a data de nascimento" />
                        <Input  type='text' name='paciente_cpf' label='CPF' placeholder='CPF do paciente' handleChange={handleChange} isInvalid={validated && !paciente.paciente_cpf} errorMessage={errorMessage} mask="999.999.999-99" />
                        <Input type='tel' name='paciente_telefone' label='Número de telefone' placeholder='(00) 9.9999-9999' handleChange={handleChange} isInvalid={validated && !paciente.paciente_telefone} errorMessage="Informe o número de telefone" mask="(99) 9.9999-9999" />
                        <Input type='file' name='paciente_foto' label='Foto' placeholder='' handleChange={handleFileChange} />
                        <BootstrapButton as="input" type='submit' variant='info' className={styles.btn} value="Finalizar" />
                    </Form>
                    
                </Modal.Body>
            </Modal>
        </>
    )

}
      

    


export default CadastrarPaciente;*/

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
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [paciente, setPaciente] = useState<Paciente>({
    paciente_id: 0,
    paciente_foto: '',
    paciente_nome: '',
    paciente_dataN: '',
    paciente_cpf: '',
    paciente_telefone: '',
    paciente_atendido: false,
  });

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
    setValidated(true);

    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
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
    }
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
            />
            <Input
              type="text"
              name="paciente_telefone"
              label="Telefone"
              placeholder="Telefone"
              handleChange={handleChange}
              required
            />
            <Form.Group controlId="formFoto">
              <Form.Label>Foto</Form.Label>
              <Form.Control type="file" name="paciente_foto" onChange={handleFileChange} />
            </Form.Group>
            <div className={styles.errorMessage}>{errorMessage}</div>
            <Modal.Footer>
              <BootstrapButton variant="secondary" onClick={handleClose}>
                Fechar
              </BootstrapButton>
              <BootstrapButton variant="primary" type="submit">
                Cadastrar
              </BootstrapButton>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CadastrarPaciente;
