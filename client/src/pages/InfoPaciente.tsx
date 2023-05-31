import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Image } from 'react-bootstrap';

const InfoPaciente: React.FC = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<any>();

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
  }, [id, paciente]);

  return (
	<Container>
		<Row>
		<Image src={`http://localhost:8000/pacientes/fotos/${paciente.paciente_foto}`} rounded />

		</Row>
	</Container>
  );
};

export default InfoPaciente;
