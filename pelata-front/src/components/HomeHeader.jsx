import React, { useEffect, useState } from 'react'
import getFromLocalStorage from '../helpers/getFromLS';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

export default function HomeHeader() {
  const [ userData, setUserData ] = useState('');
  let navigate = useNavigate();
  const loginPath = "/"

  useEffect(() => {
    const userFromLS = getFromLocalStorage('userPlt');
    if (!userFromLS) navigate(loginPath);
    setUserData(userFromLS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ paddingBottom: '15px' }}>
      <p>Pelata 0.1</p>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Mostrar detalhes de { userData.username }</Accordion.Header>
          <Accordion.Body>
            <p> Posição: { userData.posicao } </p>
            <p> Gols marcados: { userData.gols } </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
