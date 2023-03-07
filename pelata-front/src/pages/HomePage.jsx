import React, { useContext, useEffect } from 'react'
import { getGrupos } from '../api/userApi';
import GroupCard from '../components/GroupCard';
import HomeHeader from '../components/HomeHeader'
import GeneralContext from '../context/GeneralContext'
import getFromLocalStorage from '../helpers/getFromLS';

export default function HomePage() {
  const { grupos, setGrupos, setUserData } = useContext(GeneralContext);

  const getAllGrupos = async () => {
    const userData = getFromLocalStorage('userPlt');
    setUserData(userData);
    const gruposData = await getGrupos(userData.token);
    setGrupos(gruposData.data);
    console.log(gruposData.data);
  }

  useEffect(() => {
    getAllGrupos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HomeHeader/>
      <div>
        <h2>Grupos disponíveis</h2>
        { grupos.length > 0 && grupos.map((e, index) =>
          (
            <GroupCard
              nome= { e.nome }
              descricao= { e.descricao }
              jogadores_cadastrados= { e.jogadores_cadastrados }
              peladas= { e.peladas }
              idGrupo= { e.id }
              key= { index }
            />
          )
        )}
      </div>
    </div>
  )
}
