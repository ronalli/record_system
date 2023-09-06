import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('alex@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [errorsLogin, setErrorsLogin] = useState('');

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const authUser = {
      email,
      password,
    };
    axios
      .post('http://localhost:5000/api/login', authUser)
      .then((res) => {
        if (res.status === 200) {
          setEmail('');
          setPassword('');
          navigate('/');
        }
        return res;
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
      })
      .catch((errors) => {
        setErrorsLogin(errors.response.data);
      });
  };

  return (
    <>
      {errorsLogin && <h2>{errorsLogin.message}</h2>}
      <form onSubmit={login}>
        <label htmlFor='email'>
          Email:
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          Password:
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
