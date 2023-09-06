import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateErrors, setValidateErros] = useState('');
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    axios
      .post('http://localhost:5000/api/register', newUser)
      .then((res) => {
        if (res.status === 201) {
          setName('');
          setEmail('');
          setPassword('');
          window.localStorage.setItem('token', res.data.token);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setValidateErros(err.response.data.errors);
      });
  };

  const printErrors = (field) => {
    if (validateErrors) {
      for (let i = 0; i < validateErrors.length; i++) {
        if (validateErrors[i].path === field) {
          return validateErrors[i].msg;
        }
      }
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor='name'>Имя:</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>{printErrors('name')}</span>
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>{printErrors('email')}</span>
        </div>
        <div>
          <label htmlFor='password'>Пароль:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>{printErrors('password')}</span>
        </div>
        <button type='submit'>Отправить</button>
      </form>
    </div>
  );
};

export default Register;
