import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {LoginAPI} from "../api/LoginAPI"

const label = (labelName, type, value, name) => {
  return (
    <label>
      {labelName}
      <input
        className={styles.inputBox}
        type={type}
        defaultValue={value}
        name={name}
      />
    </label>
  );
};

const LoginForm = (props) => {
  // Desestructuramos los props:
  const { setAuthHook, userData, userDataHook } = props;
  const { username, password } = userData;

  const navigate = useNavigate();

  // Establecemos la función que guarda los cambios en los datos globales:
  const handleSubmit = (event) => {
    // Suspendemos el evento para evitar submits erroneos
    event.preventDefault();
    // Seteamos como autorizado al usuario
    const username = event.target.username.value;
    const password = event.target.password.value;
    LoginAPI.post(username, password).then((data) => {
      console.log(data);
      setAuthHook(true);
      // Actualizamos el objeto userData en este contexto
      userData.username = event.target.username.value;
      userData.password = event.target.password.value;
      userData.email = data.user.email;
      userData.email = data.user.email;
      userData.firstName = data.user.first_name;
      userData.lastName = data.user.last_name;
      userData.key = data.key;
      // Actualizamos userData para el contexto global
      userDataHook(userData);
      // console.table(userData);
      sessionStorage.setItem('userDataEcommerce', JSON.stringify(userData))
      window.location = "/";
    });

    
  };

  return (
    <div className={styles.Container}>
      <div className={styles.formContainer}>
        <div className={styles.initialMessage}>
          <h1>Welcome</h1>
          <p>Log in to your account</p>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          {/* Cada setXxxx actualiza "onChange" el valor del hook,
          cuando el usuario presiona una tecla en el campo, se actualiza
          el valor de la variable del hook. Es por eso que newName debe disparar a setNewName */}
          {label("Username:", "text", username,"username")}
          {label("Password:", "password", password,"password")}
          <input className={styles.submitButton} type="submit" value="Log In" />
        </form>
      </div>
      <div className={styles.endMessage}>
        <p>
          New to marvel e-commerce?{" "}
          <NavLink className={styles.signupLink} to="/signup">
            Sign Up!
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
