import React, { useEffect, useState } from 'react'
import getFromLocalStorage from '../helpers/getFromLS';

export default function HomeHeader() {
  const [ userData, setUserData ] = useState('');

  useEffect(() => {
    const userFromLS = getFromLocalStorage('userPlt');
    setUserData(userFromLS);
  }, []);

  return (
    <div>
      <p>Pelata 0.1</p>
      <div>
        <h3> { userData.username } </h3>
        <h4> { userData.posicao } </h4>
        <h4> Gols marcados: { userData.gols } </h4>
      </div>
    </div>
  )
}
