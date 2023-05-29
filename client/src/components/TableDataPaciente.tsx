import React from "react"
import styles from "./TableDataPaciente.module.css"
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import { Link } from "react-router-dom";

interface TableDataPacienteProps {
    foto: string;
    nome: string;
    idade: string;
    cpf: string;
    tel: string;
    situacao: boolean;
}

const TableDataPaciente: React.FC<TableDataPacienteProps> = ({foto, nome, idade, tel, cpf, situacao}) => {
    
    return <tr>
        <td>
            <img src={`http://localhost:8000/pacientes/${foto}`} alt="Foto do(a) paciente" className={styles.img} />
        </td>
        <td>
            <p>{nome}</p>
        </td>
        <td>
            <p>{idade}</p>
        </td>
        <td>
            <p>{cpf}</p>
        </td>
        <td>
            <p>{tel}</p>
        </td>
        <td>
            <p>{situacao ? ("Atendido(a)") : ("Não atendido(a)")}</p>
        </td>
        <td>
            <p>
                <Link to="/">
                    <BsFillArrowRightSquareFill className={styles.icon} />
                </Link>
            </p>
        </td>
    </tr>
}

export default TableDataPaciente