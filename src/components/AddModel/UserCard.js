import React from 'react';
import "./UserCard.css"

const UserCard = (props) => {
  const { name, phone, email, id } = props.user;
  const editContact=()=>{
    props.setUserId(id);
    props.setSubmitType("edit");
    props.formData.setName(name);
    props.formData.setEmail(email);
    props.formData.setMobile(phone);
  }
  return (
    <div className="card">
      <span>{name}</span>
      <span>{phone}</span>
      <span>{email}</span>
      <div className="img-div">
        <img src="../edit.png" alt="" onClick={editContact}></img>
        <img
          src="../delete.png"
          alt=""
          onClick={() => props.deleteContact(id)}
        ></img>
      </div>
    </div>
  );
}

export default UserCard
