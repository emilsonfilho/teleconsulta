import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from "axios"

const InfoPaciente: React.FC = () => {
		const { id } = useParams()
		const [paciente, setPaciente] = useState()
		
		useEffect(() => {
				const fetchPaciente = async () => {
						try {
								const response = await axios.get(`http://localhost:8000/pacientes/infoPaciente/${id}`)
								const result = response.data
								setPaciente(result)
								console.log(result)
						} catch(err) {
								console.log(err)
						}
				}
				fetchPaciente()
		}, [])
		return (
				<p></p>
		)
}

export default InfoPaciente