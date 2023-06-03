import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Image, Button, Form, Col, InputGroup, Table } from 'react-bootstrap';
import styles from './InfoPaciente.module.css'

type Paciente = {
  paciente_id: number;
  paciente_foto: string;
  paciente_nome: string;
  paciente_dataN: string;
  paciente_cpf: string;
  paciente_telefone: string;
  paciente_atendido: boolean;
}

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
}

const InfoPaciente: React.FC = () => {
  const { id } = useParams();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valorNumerico = value.replace(/[^0-9,]/g, '')
    setDadosSaude((prevDadosSaude) => ({
      ...prevDadosSaude,
      [name]: valorNumerico,
    }))
  }

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
    
    axios.post('http://localhost:8000/consultas/cadastrarConsulta', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then(response => {
        setShowConsulta(!showConsulta);
        setShowButton(!showButton)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/infoPaciente/${id}`);
        const result = response.data;
        setPaciente(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPaciente();
  }, [id]);

  useEffect(() => {
    const fetchSintomas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getSintomas')
        const result = response.data
        console.log(result);

        setSintomas(result)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSintomas()
  }, [])

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getConsultas/${id}`)
        const result = response.data
        console.log(result);
        setConsultas(result)

        result.forEach((consulta: Consulta) => {
          fetchResultado(consulta.id_resultado)
        })
      } catch (err) {
        console.log(err);
      }
    }
    fetchConsultas()
  }, [id])

  const fetchResultado = (id: number) => {
    const getResultado = async (id: number) => {
      try {
        const response = await axios.get(`http://localhost:8000/resultados/${id}`);
        const result = response.data;
        setResultados((prevResultados) => ({
          ...prevResultados,
          [id]: result,
        }))
      } catch (err) {
        console.log(err);
      }
    }
    getResultado(id)
  }

  return (
	<>
    <Container>
      <Row>
        <section className={styles.section}>
          <div className={styles.foto}>
            <Image src={`http://localhost:8000/pacientes/fotos/${paciente?.paciente_foto}`} rounded />
          </div>
          {paciente && (
            <div className={styles.info}>
              <h2>{paciente.paciente_nome}</h2>
              <p>
                <strong>CPF:</strong> {paciente.paciente_cpf}
              </p>
              <p>
                <strong>Data de Nascimento:</strong> {paciente.paciente_dataN}
              </p>
              <p>
                <strong>Telefone:</strong> {paciente.paciente_telefone}
              </p>
            </div>
          )}
        </section>
        <div className={styles.divBtn}>
            {showButton && (
              <Button variant='primary' onClick={toggleConsulta} className={styles.btn}>
                {!showConsulta ? "Realizar Consulta" : "Finalizar"}
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
                      <Form.Control className="mb-2" id="inlineFormInput" placeholder="Temperatura (°C)" name="consulta_temperaturaPaciente" value={dadosSaude.consulta_temperaturaPaciente} onChange={handleChange} />
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Frequência Respiratória
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Frequência Respiratória" name='consulta_frequenciaRespiratoriaPaciente' value={dadosSaude.consulta_frequenciaRespiratoriaPaciente} onChange={handleChange} />
                      </InputGroup>
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Frequência Cardíaca
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Frequência Cardíaca" name='consulta_frequenciaCardiacaPaciente' value={dadosSaude.consulta_frequenciaCardiacaPaciente} onChange={handleChange} />
                      </InputGroup>
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Pressão Arterial Sistólica
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Pressão Arterial Sistólica" name='consulta_pressaoArterialSistolicaPaciente' value={dadosSaude.consulta_pressaoArterialSistolicaPaciente} onChange={handleChange} />
                      </InputGroup>
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Pressão Arterial Diastólica
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control id="inlineFormInputGroup" placeholder="Pressão Arterial Diastólica" name='consulta_pressaoArterialDiastolicaPaciente' value={dadosSaude.consulta_pressaoArterialDiastolicaPaciente} onChange={handleChange} />
                      </InputGroup>
                    </Col>
                  </Row>
                  <h3>Sintomas</h3>
                  <Row>
                    {sintomas.map((sintoma) => (
                    <Col xs="auto" key={sintoma.sintoma_id}>
                      <InputGroup className={`mb-3 ${styles.igroup}`}>
                        <InputGroup.Checkbox value={sintoma.sintoma_id} className={styles.checkbox} />
                        {sintoma.sintoma_nome}
                      </InputGroup>
                    </Col>
                    ))}
                  </Row>
                  <Button variant='primary' type='submit'>
                    Finalizar
                  </Button>
                </Form>
              </div>
            )}
      </Row>
    </Container>
    <Container>
      <Row>
        <h2>Consultas anteriores</h2>
        {(consultas.length !== 0) ? (
          <Table>
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
                  <td>{consulta.consulta_dataAtendimento}</td>
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
  </>
  );
};

export default InfoPaciente;
