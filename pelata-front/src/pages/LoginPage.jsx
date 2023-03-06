import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import LoginHeader from '../components/LoginHeader';
import { checkToken, loginUser } from '../api/userApi';
import getFromLocalStorage from '../helpers/getFromLS';

export default function LoginPage() {
  let navigate = useNavigate();
  const homePath = '/home';

  const [ inputEmail, setInputEmail ] = useState('');
  const [ inputPassword, setInputPassword ] = useState('');
  const [ loginBtnIsDisabled, setLoginBtnIsDisabled ] = useState(true);
  const [ isLogged, setIsLogged ] = useState(false);
  const [ invalidLogin, setInvalidLogin ] = useState(false);

  const validateEmail = () => (/\S+@\S+\.\S+/).test(inputEmail); //regex para validacao de formato do email
  const validateInputs = () => {
    if (validateEmail() && inputPassword.length > 5) {
      setLoginBtnIsDisabled(false);
    } else {
      setLoginBtnIsDisabled(true);
    }
  }

  const tokenValidate = async () => {
    const userData = getFromLocalStorage('userPlt');
    if(userData) {
      const tokenIsValid = await checkToken(userData.token);
      if(tokenIsValid) {
        navigate(homePath);
      }
    }
  };

  useEffect(() => {
    tokenValidate();
  });
  
  useEffect(() => {
    validateInputs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEmail, inputPassword]);

  useEffect(() => {
    if (isLogged) {
      navigate(homePath);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const userOnChange = ({ target: { value, name }}) => {
    name === 'email-input' ? setInputEmail(value) : setInputPassword(value);
  };

  const loginClick = async (body) => {
    const loginStatus = await loginUser(body);
    setIsLogged(loginStatus);
    setInvalidLogin(!loginStatus);
  }

  return (
    <div>
      <LoginHeader/>
      <div className='loginWindow'>
        <input type="text" placeholder="Seu e-mail" autoFocus={ true } name="email-input" onChange={ userOnChange }/>
        <input type="password" placeholder="Senha" onChange={ userOnChange }/>
        <button 
          type='button' 
          disabled={ loginBtnIsDisabled } 
          onClick= { () => loginClick({ email: inputEmail, password: inputPassword}) }
        >
          Login
        </button>
        { invalidLogin && <p>Usuário ou senha incorretos</p> }
        { !validateEmail() && <p>Informe um e-mail válido</p> }
        { inputPassword.length < 6 && <p>Senha deve ter mais de 6 dígitos</p> }
      </div>
      <div>
        <p>Não tem uma conta ainda? Faça o seu cadastro no botão abaixo!</p>
        <button type='button'>Cadastre-se</button>
      </div>
    </div>
  )
}
