import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Image, Button, Form, Col, InputGroup, Table, Modal } from 'react-bootstrap';
import styles from './InfoPaciente.module.css'
import formatDate from '../utils/formatDate';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Input from '../form/Input';

type DadosSaude = {
  consulta_temperaturaPaciente: string;
  consulta_frequenciaRespiratoriaPaciente: string;
  consulta_frequenciaCardiacaPaciente: string;
  consulta_pressaoArterialSistolicaPaciente: string;
  consulta_pressaoArterialDiastolicaPaciente: string;
}

type Sintoma = {
  sintoma_id: number;
  sintoma_nome: string;
}

type Consulta = {
  consulta_temperaturaPaciente: string;
  consulta_dataAtendimento: string;
  consulta_frequenciaCardiacaPaciente: string;
  consulta_pressaoArterialSistolicaPaciente: string;
  consulta_pressaoArterialDiastolicaPaciente: string;
  consulta_frequenciaRespiratoriaPaciente: string;
  id_resultado: number;
  result: {
    resultado_id: number;
    resultado_nome: string;
  };
}

const InfoPaciente: React.FC = () => {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate()
  const [paciente, setPaciente] = useState<any>();
  const [showConsulta, setShowConsulta] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [dadosSaude, setDadosSaude] = useState<DadosSaude>({
    consulta_temperaturaPaciente: '',
    consulta_frequenciaRespiratoriaPaciente: '',
    consulta_frequenciaCardiacaPaciente: '',
    consulta_pressaoArterialSistolicaPaciente: '',
    consulta_pressaoArterialDiastolicaPaciente: '',
  })
  const [sintomas, setSintomas] = useState<Sintoma[]>([])
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [resultados, setResultados] = useState<{ [key: number]: string }>({});
  const [formValid, setFormValid] = useState(false);
  const notify = (message: string) => toast(message);
  const [showModel, setShowModel] = useState(false);
  const handleShowModel = () => setShowModel(true);
  const handleCloseModel = () => setShowModel(false);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    

    const formAtualizacao = e.target as HTMLFormElement;
    console.log(formAtualizacao);
    if (!formAtualizacao.checkValidity()) {
      setValidated(true);
      
      return;
    }

    if (!paciente.paciente_nome || !paciente.paciente_dataN || !paciente.paciente_cpf || !paciente.paciente_telefone) {
      setValidated(true);
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    const formDataAtualizacao = new FormData(formAtualizacao);
    console.log(formDataAtualizacao);
    
    axios
      .put(`http://localhost:8000/api/pacientes/atualizarPaciente/${id}`, formDataAtualizacao)
      .then((response) => {
        handleCloseModel();
        navigate('/');
        notify('Paciente atualizado com sucesso.');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Functions
  const validateForm = () => {
    const {
      consulta_temperaturaPaciente,
      consulta_frequenciaRespiratoriaPaciente,
      consulta_frequenciaCardiacaPaciente,
      consulta_pressaoArterialSistolicaPaciente,
      consulta_pressaoArterialDiastolicaPaciente,
    } = dadosSaude;
  
    const isFormValid =
      consulta_temperaturaPaciente.trim() !== '' &&
      consulta_frequenciaRespiratoriaPaciente.trim() !== '' &&
      consulta_frequenciaCardiacaPaciente.trim() !== '' &&
      consulta_pressaoArterialSistolicaPaciente.trim() !== '' &&
      consulta_pressaoArterialDiastolicaPaciente.trim() !== '';
  
    setFormValid(isFormValid);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valorNumerico = value.replace(/[^0-9,]/g, '');
  
    setDadosSaude((prevDadosSaude) => ({
      ...prevDadosSaude,
      [name]: valorNumerico,
    }));
  
    validateForm();
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
    console.log(paciente)
  };
  const toggleConsulta = () => {
    setShowConsulta(!showConsulta)
    setShowButton(!showButton)
  }
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    console.log(e.target);
    
    const formData = new FormData(form)
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked')
    const selectedCheckboxes = Array.from(checkboxes).map((checkbox) => {
      const checkboxElement = checkbox as HTMLInputElement
      return {
        sintoma_id: parseInt(checkboxElement.value)
      }
    })
    formData.append('ids_sintomas', JSON.stringify(selectedCheckboxes))

    if (id) {
      formData.append('id_paciente', id)
    }

    console.log([...formData.entries()]);
    
    axios.post('http://localhost:8000/api/consultas/cadastrarConsulta', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then(response => {
        setShowConsulta(!showConsulta);
        setShowButton(!showButton);
        console.log(response);
        navigate('/');
        notify("Consulta cadastrada com sucesso!");
      })
      .catch(err => {
        console.log(err);
      })
    }

  // UseEffects
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/infoPaciente/${id}`);
        const result = response.data.data;
        setPaciente(result);
        setConsultas(result.consulta)
        result.consulta.forEach((consulta: Consulta) => {
          setResultados((prevResultados) => ({
            ...prevResultados,
            [consulta.result.resultado_id]: consulta.result.resultado_nome,
          }))
        })
      } catch (err) {
        console.log(err);
      }
    };
    fetchPaciente();
  }, [id]);
  useEffect(() => {
    const fetchSintomas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getSintomas')
        const result = response.data
        setSintomas(result)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSintomas()
  }, [])

  function deletePatient() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você está prestes a excluir um paciente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`http://localhost:8000/api/pacientes/deletarPaciente/${paciente?.paciente_id}`)
            .then(response => {
              navigate('/')
              notify("Paciente removido com sucesso.")
            })
            .catch(err => { console.log(err) })
        } catch (err) {
          console.log(err);
        }
      }
    })
  }


  return (
	<>
    <Modal show={showModel} onHide={handleCloseModel}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Pacientes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {paciente && (
          <>
          {/* Lembre-se que, ao adicionar para atualizar a imagem, será preciso adicionar o encType */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Input
                type='text'
                name='paciente_nome'
                label='Nome completo'
                placeholder='Nome do paciente'
                handleChange={handleChangeInput}
                value={paciente.paciente_nome}
              />
              <Input
                type='date'
                name='paciente_dataN'
                label='Data de Nascimento'
                placeholder='Insira a data de nascimento'
                handleChange={handleChangeInput}
                value={paciente.paciente_dataN}
              />
              <Input
                type='text'
                name='paciente_cpf'
                label='Cadastro de Pessoa Física'
                placeholder='CPF'
                handleChange={handleChangeInput}
                value={paciente.paciente_cpf.replaceAll(/[.-]/g,'')}
                mask='000.000.000-00'
              />
              <Input
                type='text'
                name='paciente_telefone'
                label='Telefone'
                placeholder='Telefone'
                handleChange={handleChangeInput}
                value={paciente.paciente_telefone.replaceAll(/[()\s.-]/g,'')}
                mask='(00) 0.0000-0000'
              />
              {validated && (
                <div className={styles.error}>
                  <p>{errorMessage}</p>
                </div>
              )}
              <br />
              <div className={styles.buttonsContainer}>
                <Button variant="primary" type="submit" className={styles.btn}>
                  Atualizar
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
    <Container>
      <Row>
        <section className={styles.section}>
          <div className={styles.foto}>
            <Image src={`http://localhost:8000/storage/${paciente?.paciente_foto}`} rounded />
          </div>
          {paciente && (
            <div className={styles.info}>
              <h2>{paciente.paciente_nome}</h2>
              <p>
                <strong>CPF:</strong> {paciente.paciente_cpf}
              </p>
              <p>
                <strong>Data de Nascimento:</strong> {formatDate(paciente.paciente_dataN)}
              </p>
              <p>
                <strong>Telefone:</strong> {paciente.paciente_telefone}
              </p>
              <div className={styles.buttons}>
                <Button variant='primary' onClick={handleShowModel}>Editar Paciente</Button>
                <Button variant='danger' onClick={deletePatient}>
                  Deletar Paciente
                </Button>
              </div>
            </div>
          )}
        </section>
        <hr />
        <div className={styles.divBtn}>
            {showButton && (
              <Button variant='primary' onClick={toggleConsulta} className={styles.btn}>
                {!showConsulta ? "Realizar Consulta" : ""}
              </Button>
            )}
        </div>
        {showConsulta && (
              <div className={styles.divConsulta}>
                <h2 className={styles.h2}>Consulta</h2>
                <Form onSubmit={submitForm} encType='multipart/form-data'>
                  <h3>Dados de saúde do paciente</h3>
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Temperatura
                      </Form.Label>
                      <Form.Control className="mb-2" id="inlineFormInput" placeholder="Temperatura (°C)" name="consulta_temperaturaPaciente" value={dadosSaude.consulta_temperaturaPaciente} onChange={handleChange} autoComplete='off' />
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Frequência Respiratória
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Frequência Respiratória" name='consulta_frequenciaRespiratoriaPaciente' value={dadosSaude.consulta_frequenciaRespiratoriaPaciente} onChange={handleChange} autoComplete='off' />
                      </InputGroup>
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Frequência Cardíaca
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Frequência Cardíaca" name='consulta_frequenciaCardiacaPaciente' value={dadosSaude.consulta_frequenciaCardiacaPaciente} onChange={handleChange} autoComplete='off' />
                      </InputGroup>
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Pressão Arterial Sistólica
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Pressão Arterial Sistólica" name='consulta_pressaoArterialSistolicaPaciente' value={dadosSaude.consulta_pressaoArterialSistolicaPaciente} onChange={handleChange} autoComplete='off' />
                      </InputGroup>
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Pressão Arterial Diastólica
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Pressão Arterial Diastólica" name='consulta_pressaoArterialDiastolicaPaciente' value={dadosSaude.consulta_pressaoArterialDiastolicaPaciente} onChange={handleChange} autoComplete='off' />
                      </InputGroup>
                    </Col>
                  </Row>
                  <h3>Sintomas</h3>
                  <Row>
                    {sintomas.map((sintoma) => (
                    <Col xs="auto" key={sintoma.sintoma_id}>
                      <InputGroup className={`mb-3 ${styles.igroup}`}>
                        <Form.Check
                          type='checkbox'
                          id={(sintoma.sintoma_id).toString()}
                          value={sintoma.sintoma_id}
                          label={sintoma.sintoma_nome}
                        />
                      </InputGroup>
                    </Col>
                    ))}
                  </Row>
                  <Button variant='primary' type='submit' disabled={!formValid} className={styles.btn} >
                    Finalizar
                  </Button>
                </Form>
              </div>
            )}
      </Row>
    </Container>
    <Container className={styles.consultas}>
      <Row>
        <h2 className={styles.titleConsultas}>Consultas anteriores</h2>
        <hr />
        {(consultas.length !== 0) ? (
          <Table className={styles.table}>
            <thead>
              <tr>
                <th>Data da consulta</th>
                <th>Temperatura</th>
                <th>Frequência Cardíaca</th>
                <th>Pressão Arterial</th>
                <th>Frequência Respiratória</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((consulta: Consulta, index) => (
                <tr key={index}>
                  <td>{formatDate(consulta.consulta_dataAtendimento)}</td>
                  <td>{consulta.consulta_temperaturaPaciente}</td>
                  <td>{consulta.consulta_frequenciaCardiacaPaciente}</td>
                  <td>{consulta.consulta_pressaoArterialSistolicaPaciente} x {consulta.consulta_pressaoArterialDiastolicaPaciente}</td>
                  <td>{consulta.consulta_frequenciaRespiratoriaPaciente}</td>
                  <td>{resultados[consulta.id_resultado]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Não há consultas para esse paciente ainda</p>
        )}
      </Row>
    </Container>
    <ToastContainer />
  </>
  );
};

export default InfoPaciente;
