import cat from '../img/cat.png';
import CadastrarPaciente from '../components/CadastrarPaciente';
import styles from './Home.module.css';
import { Col, Container, Row, Table } from 'react-bootstrap';
import TableDataPaciente from '../components/TableDataPaciente';
import calculaIdade from '../utils/calculaIdade';

type Paciente = {
  paciente_id: number;
  paciente_foto: string;
  paciente_nome: string;
  paciente_dataN: string;
  paciente_cpf: string;
  paciente_telefone: string;
  paciente_atendido: boolean;
};

interface HomeProps {
  pacientes: Paciente[];
  addPaciente: (paciente: Paciente) => void;
}

const Home: React.FC<HomeProps> = ({ pacientes, addPaciente }) => {
  return (
    <>
      {pacientes.length === 0 ? (
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
                      {pacientes.map((paciente, index) => (
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