import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import LoginHeader from '../components/LoginHeader';
import { checkToken, loginUser } from '../api/userApi';
import getFromLocalStorage from '../helpers/getFromLS';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function LoginPage() {
  let navigate = useNavigate();
  const homePath = '/home';
  const registerPath = '/register'

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
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Digite seu email" 
              onChange={ userOnChange }
              name="email-input"
            />
            { 
              !validateEmail() && 
                (<Form.Text className="text-muted">
                  Informe um email válido.
                </Form.Text>)
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" onChange={ userOnChange }/>
            { 
              inputPassword.length < 6 && 
                (<Form.Text className="text-muted">
                  Senha deve ter mais de 6 dígitos.
                </Form.Text>)
            }
          </Form.Group>
          <Button
            onClick={ () => loginClick({ email: inputEmail, password: inputPassword}) }
            disabled={ loginBtnIsDisabled }
            variant="primary"
            size='lg'
          >
            Login
          </Button>
        </Form>
        <br></br>
      <Modal show={invalidLogin} onHide={ () => { setInvalidLogin(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Email ou senha incorretos</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você digitou o email ou a senha errado aí magão</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { setInvalidLogin(false)}}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <div>
        <p>Não tem uma conta ainda? Faça o seu cadastro no botão abaixo!</p>
        <Button variant="success" onClick={ () => { navigate(registerPath)}}>Cadastre-se</Button>
      </div>
    </div>
  )
}
