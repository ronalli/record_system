import React from 'react';

const Header = ({ auth, setToken }) => {
  const Logout = () => {
    window.localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div>
      <a href='/'>
        <div>Record System</div>
      </a>
      <div>
        {auth ? (
          <div>
            <button onClick={Logout}>Выйти</button>
          </div>
        ) : (
          <>
            <a href='/login'>
              <button>Войти</button>
            </a>
            <a href='/register'>
              <button>Регистрация</button>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
