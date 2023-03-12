import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getGrupos, getUserById } from '../api/userApi';
import HomeHeader from '../components/HomeHeader';
import getFromLocalStorage from '../helpers/getFromLS';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Placeholder from 'react-bootstrap/Placeholder';

export default function GroupPage() {
  const [ grupo, setGrupo ] = useState({});
  const [ grupoAdm, setGrupoAdm ] = useState({});

  let navigate = useNavigate();
  const homePath = '/home';
  const location = useLocation().pathname;
  const groupId = location.slice(8);

  useEffect(() => {
    setGroup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    typeof grupo.admin_id == 'number' && setAdm(grupo.admin_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupo]);

  const setGroup = async () => {
    const userData = getFromLocalStorage('userPlt');
    const { data } = await getGrupos(userData.token);
    data.forEach((e) => {
      if (e.id === +groupId) setGrupo(e);
    });
  }

  const setAdm = async (id) => {
    const admin = await getUserById(+id);
    setGrupoAdm(admin.data);
  }


  return (
    <div>
      <HomeHeader/>
      { grupoAdm !== {} ? <Card className="text-center">
        <Card.Header>Detalhes do grupo</Card.Header>
        <Card.Body>
          <Card.Title>{`${grupo.nome}`}</Card.Title>
          <Card.Text>
            {`${grupo.descricao}`}
          </Card.Text>
          <Card.Text>
            { grupoAdm !== {} && `Administrador do grupo: ${grupoAdm.username}`}
          </Card.Text>
        </Card.Body>
      </Card> : 
      <Card className="text-center">
        <Card.Header>Detalhes do grupo</Card.Header>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </Card.Body>
      </Card>
      }
      <Accordion defaultActiveKey="2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Mostrar Participantes do Grupo</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Posição</th>
                  <th>Cidade/Estado</th>
                  <th>Gols marcados</th>
                </tr>
              </thead>
              <tbody>
                {
                  grupo.nome && grupo.jogadores_cadastrados.map((e, index) => (
                    <tr key={ index }>
                      <td>{ index +1 }</td>
                      <td>{ e.username }</td>
                      <td>{ e.posicao }</td>
                      <td>{ `${e.cidade}/${e.estado}`}</td>
                      <td>{ e.gols }</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Mostrar Peladas Cadastradas</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Localização</th>
                  <th>Status</th>
                  <th>###</th>
                </tr>
              </thead>
              <tbody>
                {
                  grupo.nome && grupo.peladas.map((e, index) => (
                    <tr  key={ index }>
                      <td>{ index +1 }</td>
                      <td>{ e.data.slice(0, -14) }</td>
                      <td>{ `${e.rua}, ${e.bairro} - ${e.cidade}/${e.estado}`}</td>
                      <td>Finalizada</td>
                      <td><Button onClick={() => console.log(grupo)}>Participar</Button></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button onClick={ () => navigate(homePath)} style={{ marginTop: '15px'}}>Voltar</Button>
    </div>
  )
}
