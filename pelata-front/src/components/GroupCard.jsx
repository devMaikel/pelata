import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addGrupo, rmvGrupo } from '../api/userApi';
import GeneralContext from '../context/GeneralContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function GroupCard({ descricao, nome, jogadores_cadastrados, peladas, idGrupo }) {
  const [ participa, setParticipa ] = useState(false);
  const { userData } = useContext(GeneralContext);

  let navigate = useNavigate();

  useEffect(() => {
    checkParticipa();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkParticipa = () => {
    jogadores_cadastrados.forEach((e) => {
      e.id === userData.id && setParticipa(true);
    });
  }

  const entrarGrupo = async () => {
    await addGrupo(userData.token, userData.id, idGrupo);
    setParticipa(true);
  }

  const sairGrupo = async () => {
    await rmvGrupo(userData.token, userData.id, idGrupo);
    setParticipa(false);
  }

  const detalhes = () => {
    const path = `/grupos/${idGrupo}`
    navigate(path)
  }

  return (
    <div style={{ padding: '5px' }}>
    <Card style={{ width: '15rem' }} bg="secondary" text="light">
      <Card.Body>
        <Card.Title>{ nome }</Card.Title>
        <Card.Text>{ descricao }</Card.Text>
        <p>Qtd jogadores: { jogadores_cadastrados.length }</p>
        <p>Peladas já realizadas: { peladas.length }</p>
        <br/>
        { participa 
        ? <Button onClick={ sairGrupo } disabled={ !participa } variant='danger'>Sair do Grupo</Button>
        : <Button onClick={ entrarGrupo } disabled={ participa } variant='success'>Participar do Grupo</Button>
        }
        <br/>
        <br></br>
        <Button onClick={ detalhes }>Detalhes</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
