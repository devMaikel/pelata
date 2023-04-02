import React, { useEffect, useState } from 'react'
import getFromLocalStorage from '../helpers/getFromLS';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../api/userApi';

export default function HomeHeader() {
  const [ userData, setUserData ] = useState('');
  let navigate = useNavigate();
  const loginPath = "/"

  useEffect(() => {
    refreshUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshUser = async () => {
    const userFromLS = await getFromLocalStorage('userPlt');
    if (!userFromLS) navigate(loginPath);
    checkToken(userFromLS.token);
    setUserData(await getFromLocalStorage('userPlt'));
    // const future = Date.now() + 5000;
    // while (Date.now() < future) {}
  }


  return (
    <div style={{ paddingBottom: '15px' }}>
      <p>Pelata 0.1</p>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Mostrar detalhes de { userData.username }</Accordion.Header>
          <Accordion.Body>
            <p> E-mail: { userData.email } </p>
            <p> Endereço: { `${userData.rua}, ${userData.bairro} - ${userData.cidade}/${userData.estado}` } </p>
            { 
              userData.jogador && (
                <div>
                  <p>Posição: { userData.jogador.posicao }</p>
                  <p>
                    { 
                      `${userData.jogador.vitorias} Vitórias, ${userData.jogador.derrotas} Derrotas,
                      ${userData.jogador.empates} Empates`
                    }
                  </p>
                  <p>Total de gols: { userData.jogador.gols}</p>
                </div>
              )
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
