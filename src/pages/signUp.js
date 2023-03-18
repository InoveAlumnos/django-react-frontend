import styles from "./signUp.module.css";
import { FormInput } from "../components/form_inputs/formInputs.js";
import { NavLink, useNavigate } from "react-router-dom";

import {UserAPI} from "../api/UserAPI"

import toast from 'react-hot-toast';

const SignUpForm = (props) => {
  let navigate = useNavigate();
  const { setAuthHook, userData, userDataHook } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const e = event.target
    // alert(`Your data: 
    // ✅ First Name: ${e.first_name.value}
    // ✅ Last Name: ${e.last_name.value}
    // ✅ Username: ${e.username.value}
    // ✅ E-mail: ${e.email.value}
    // ✅ Password: ${e.password.value}
    // ✅ Repeated password: ${e.repeatPassword.value}`);
    if (e.password.value !== e.repeatPassword.value) {
      // Previene que las contraseñas ingresadas sean distinas
      toast.error("😬 Las contraseñas no coinciden");
    } else {

      UserAPI.post(
        e.first_name.value,
        e.last_name.value,
        e.email.value,
        e.username.value,
        e.password.value,
      ).then( (data) => {
        console.table(data);
        toast.success("🥳 ¡Gracias por unirte!");
        // userData.first_name = e.first_name.value;
        // userData.last_name = e.last_name.value;
        // userData.username = e.username.value;
        // userData.email = e.email.value;
        // userData.password = e.password.value;
        // setAuthHook(true);
        // // Actualizamos userData para el contexto global
        // userDataHook(userData);

        // sessionStorage.setItem('userDataEcommerce', JSON.stringify(userData))
        // // window.location = "/";

        navigate("/login", { replace: true });

      }).catch( error => {
        console.log(error);
        toast.error(JSON.stringify(error.response.data));
      });





      // // Actualiza el objeto global userData
      // setAuthHook(true);
      // alert("🥳 Thank you for joining us!!");
      // userData.first_name = e.first_name.value;
      // userData.last_name = e.last_name.value;
      // userData.username = e.username.value;
      // userData.email = e.email.value;
      // userData.password = e.password.value;
      // userDataHook(userData);
      // navigate("/home", { replace: true });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.fromBox}>
        <div className={styles.initialMessage}>
          <h1>¡Registrate!</h1>
        </div>
        <form className={styles.signUpFormContainer} onSubmit={handleSubmit}>
          {FormInput("First name:", "text", userData.first_name,"first_name" )}
          {FormInput("Last name:", "text", userData.last_name,"last_name" )}
          {FormInput("Username:", "text", userData.username,"username" )}
          {FormInput("Email:", "email", userData.email,"email" )}
          {FormInput("Password:", "password", userData.password,"password" )}
          {FormInput("Repeat password:", "password", "MySuperSecretKey","repeatPassword" )}
          <input
            className={styles.submitButton}
            type="submit"
            value="Create Account"
          />
        </form>
      </div>
      <div className={styles.endMessage}>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <NavLink className={styles.loginLink} to="/login">
            Log In!
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default SignUpForm;
