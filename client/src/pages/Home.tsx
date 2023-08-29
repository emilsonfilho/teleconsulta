import cat from '../img/cat.png';
import CadastrarPaciente from '../components/CadastrarPaciente';
import styles from './Home.module.css';
import { Col, Container, Row, Table } from 'react-bootstrap';
import TableDataPaciente from '../components/TableDataPaciente';
import calculaIdade from '../utils/calculaIdade';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

type Paciente = {
  paciente_id: number;
  paciente_foto: string;
  paciente_nome: string;
  paciente_dataN: string;
  paciente_cpf: string;
  paciente_telefone: string;
  paciente_atendido: boolean;
};

type Paginated = {
  data: Paciente[];
  meta: {
    per_page: number,
    total: number,
    last_page: number,
  }
}

interface HomeProps {
  addPaciente: (paciente: Paciente) => void;
}

const Home: React.FC<HomeProps> = ({ addPaciente }) => {
  const [pacientes, setPacientes] = useState<Paginated>({} as Paginated);
  const [page, setPage] = useState(0);

  const fetchPacientes = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/getPacientes', {
        params: {
          page: page + 1,
        }
      });
      
      setPacientes(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPacientes();
  }, [page]);

  return (
    <>
      {pacientes.data?.length === 0 ? (
        <>
          <img src={cat} alt="Imagem de gato" className={styles.img} />
          <h1 className={styles.title}>
            Hmm, parece que ainda não temos pacientes cadastrados
          </h1>
          <CadastrarPaciente addPaciente={addPaciente} />
        </>
      ) : (
        <Container>
          <Row>
            <Col className={styles.container}>
              <h2 className={styles.title}>Pacientes Cadastrados</h2>
              <div>
                <Col xs={12}>
                      <ReactPaginate 
                        pageCount={pacientes.meta?.last_page}
                        onPageChange={({ selected }) => setPage(selected)}
                        containerClassName="pagination"
                        pageLinkClassName='page-link'
                        activeClassName='active'
                        previousLabel={<MdNavigateBefore />}
                        nextLabel={<MdNavigateNext />}
                        nextClassName='page-link'
                        previousClassName='page-link'
                      />
                  <Table hover className={styles.table}>
                    <thead>
                      <tr>
                        <th>Foto</th>
                        <th>Nome do paciente</th>
                        <th>Idade</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Situação</th>
                        <th>Consulta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pacientes.data?.map((paciente, index) => (
                        <TableDataPaciente
                          foto={paciente.paciente_foto}
                          nome={paciente.paciente_nome}
                          idade={calculaIdade(paciente.paciente_dataN).toString() + ' anos'}
                          cpf={paciente.paciente_cpf}
                          tel={paciente.paciente_telefone}
                          situacao={paciente.paciente_atendido}
                          key={index}
                          id={paciente.paciente_id}
                        />
                      ))}
                    </tbody>
                  </Table>

                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;