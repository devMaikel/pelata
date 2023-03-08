import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getGrupos } from '../api/userApi';
import HomeHeader from '../components/HomeHeader';
import getFromLocalStorage from '../helpers/getFromLS';

export default function GroupPage() {
  const [ grupo, setGrupo ] = useState({});

  let navigate = useNavigate();
  const homePath = '/home';
  const location = useLocation().pathname;
  const groupId = location.slice(8);

  useEffect(() => {
    setGroup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setGroup = async () => {
    const userData = getFromLocalStorage('userPlt');
    const { data } = await getGrupos(userData.token);
    data.forEach((e) => {
      if (e.id === +groupId) setGrupo(e);
    });
  }


  return (
    <div>
      <HomeHeader/>
      <h1>{`${grupo.nome}`}</h1>
      <p>{`${grupo.descricao}`}</p>
      <h3>Participantes do Grupo</h3>
      { grupo.nome && grupo.jogadores_cadastrados.map((e, index) => (
        <div key={index}>
          <h5>{ e.username }</h5>
          <p>Posição: { e.posicao }</p>
          <p>{ `${e.cidade}/${e.estado}`}</p>
          <p>Gols marcados: { e.gols }</p>
        </div>
      ))}
      <h3>Peladas cadastradas</h3>
      { grupo.nome && grupo.peladas.map((e, index) => (
        <div key={index}>
          <p>Data: { e.data.slice(0, -14) }</p>
          <p>{ `Localização: ${e.rua}, ${e.bairro} - ${e.cidade}/${e.estado}`}</p>
        </div>
      ))}
      <button onClick={ () => navigate(homePath)}>Voltar</button>
    </div>
  )
}
