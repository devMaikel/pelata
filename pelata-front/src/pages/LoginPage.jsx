import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import { loginUser } from '../api/userApi';

export default function LoginPage() {
  // let navigate = useNavigate();
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
  
  useEffect(() => {
    validateInputs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEmail, inputPassword])

  const userOnChange = ({ target: { value, name }}) => {
    name === 'email-input' ? setInputEmail(value) : setInputPassword(value);
  }

  const loginClick = async (body) => {
    const loginStatus = await loginUser(body);
    setIsLogged(loginStatus);
    setInvalidLogin(!loginStatus);
  }

  return (
    <div>
      <Header/>
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
      { isLogged && <p>wtf velhorr o maluco logou!</p>}
    </div>
  )
}

//configurar um alerta melhor para usuario invalid
//desenvolver um mecanismo de pegar o usuario no localstorage caso o tenha e já sair da tela de login
//somente sair da tela de login se o token de user salvo no LS for ainda válido para logar '-'