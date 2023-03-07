import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addGrupo, rmvGrupo } from '../api/userApi';
import GeneralContext from '../context/GeneralContext';

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
    <div>
      <h3>{ nome }</h3>
      <p>{ descricao }</p>
      <p>Qtd jogadores: { jogadores_cadastrados.length }</p>
      <p>Peladas já realizadas: { peladas.length }</p>
      { participa 
      ? <button type='button' onClick={ sairGrupo } disabled={ !participa }>Sair do Grupo</button>
      : <button type='button' onClick={ entrarGrupo } disabled={ participa }>Participar do Grupo</button>
      }
      <button type='button' onClick={ detalhes }>Detalhes do grupo</button>
    </div>
  )
}
