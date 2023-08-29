import React from 'react';

const UserInfo = ({ user }) => {
  const { name, email } = user;
  return (
    <div>
      <span>{name}|</span>
      <span>{email}</span>
    </div>
  );
};

export default UserInfo;
