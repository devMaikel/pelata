import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getGrupos } from '../api/userApi';
import HomeHeader from '../components/HomeHeader';
import getFromLocalStorage from '../helpers/getFromLS';

export default function GroupPage() {
  const [ grupo, setGrupo ] = useState([]);

  useEffect(() => {
    getAllGrupos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllGrupos = async () => {
    const userData = getFromLocalStorage('userPlt');
    const { data } = await getGrupos(userData.token);
    data.forEach((e) => {
      if (e.id === +groupId) setGrupo(e);
    });
  }

  const location = useLocation().pathname;
  const groupId = location.slice(8);

  return (
    <div>
      <HomeHeader/>
      <h1>{`Nome do grupo: ${grupo.nome}`}</h1>
      <p>{`${grupo.descricao}`}</p>
    </div>
  )
}
