import styles from "./login.module.css";
import { NavLink } from "react-router-dom";

import {LoginAPI} from "../api/LoginAPI"

import toast from 'react-hot-toast';

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

  // Establecemos la función que guarda los cambios en los datos globales:
  const handleSubmit = (event) => {
    // Suspendemos el evento para evitar submits erroneos
    event.preventDefault();
    // Seteamos como autorizado al usuario
    const username = event.target.username.value;
    const password = event.target.password.value;

    LoginAPI.post(username, password)
    .then((data) => {
      setAuthHook(true);
      const { 
        last_login,
        is_superuser,
        is_staff,
        is_active,
        date_joined,
        ...userDataReceived } = { ...data.user }

      userDataReceived.token = data.token;
      userDataReceived.password = password;
      
      // Actualizamos userData para el contexto global
      userDataHook(userDataReceived);
      
      // console.table(data);
      // console.table(userDataReceived);
      sessionStorage.setItem('userDataEcommerce', JSON.stringify(userDataReceived))
      window.location = "/";
    }).catch( error => {
      console.log(error);
      toast.error("Credenciales invalidas");
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
