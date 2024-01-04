import React from 'react';
import "./UserCard.css"

const UserCard = (props) => {
  const { name, phone, email, id } = props.user;
  return (
    <div className="card">
      <span>{name}</span>
      <span>{phone}</span>
      <span>{email}</span>
      <div className="img-div">
        <img src="../edit.png" alt=""></img>
        <img src="../delete.png" alt=""></img>
      </div>
    </div>
  );
}

export default UserCard
