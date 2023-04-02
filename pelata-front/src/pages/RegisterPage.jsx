import React, { useState } from 'react'
import LoginHeader from '../components/LoginHeader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Alert from 'react-bootstrap/Alert';

export default function RegisterPage() {
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ invalidData, setInvalidData ] = useState(false)

  const validateEmail = () => (/\S+@\S+\.\S+/).test(email);

  const userOnChange = ({ target: { value, name }}) => {
    switch (name) {
      case 'email':
        setEmail(value)
        break;
      case 'name':
        setName(value)
        break;
      case 'cep':
        setCep(value)
        break;
      case 'password':
        setPassword(value)
        break;
      default:
        break;
    }
  };

  const checkInputs = () => {
    return !validateEmail() || name.length < 4 || cep.length !== 8 || password.length < 4
  }
  console.log(checkInputs());

  const loginClick = (user) => {
    setInvalidData(checkInputs());
  }

  return (
    <div>
      <LoginHeader/>
      <Form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Endereço de Email</Form.Label>
        <Form.Control onChange={ userOnChange } name="email" type="email" placeholder="Digite seu email" />
        <Form.Text className="text-muted">
          Nós nunca compartilharemos seu email com terceiros.
        </Form.Text>
      </Form.Group>
      { invalidData && !validateEmail() && <Alert variant='danger'>Informe um e-mail válido</Alert> }

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nome de Usuário</Form.Label>
        <Form.Control onChange={ userOnChange } name="name" type="string" placeholder="Digite seu Nome de Usuário" />
      </Form.Group>
      { invalidData && name.length < 4 && <Alert variant='danger'>Nome de usuário deve conter no mínimo 4 dígitos</Alert> }

      <Form.Group className="mb-3" controlId="cep">
        <Form.Label>CEP</Form.Label>
        <Form.Control onChange={ userOnChange } name="cep" type="number" placeholder="Digite o seu CEP" />
        <Form.Text className="text-muted">
          Apenas números.
        </Form.Text>
      </Form.Group>
      { invalidData && cep.length !== 8  && <Alert variant='danger'>Cep deve ser composto por 8 números</Alert> }
      
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Senha</Form.Label>
        <Form.Control onChange={ userOnChange } name="password" type="password" placeholder="Digite sua senha" />
      </Form.Group>
      { invalidData && password.length < 6 && <Alert variant='danger'>Senha deve ter mais de 6 dígitos</Alert> }
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check inline type="checkbox" label="Concordo com os termos de uso" />
      </Form.Group>
      <Button 
        variant="primary" 
        type="button"
        onClick={ () => loginClick({ })}
      >
        Submit
      </Button>
    </Form>
    </div>
  )
}
