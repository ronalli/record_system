import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import UserInfo from '../components/UserInfo/UserInfo';

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || ''
  );

  useEffect(() => {
    axios
      .get('http://localhost:5000/api', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          setAuth(true);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUser('');
    setAuth(false);
  }, [token]);

  return (
    <>
      <Header auth={auth} setToken={setToken} />
      {user && <UserInfo user={user} />}
    </>
  );
};

export default Home;
