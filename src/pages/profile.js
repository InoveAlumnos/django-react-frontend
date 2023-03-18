import styles from "./profile.module.css";

import {UserAPI} from "../api/UserAPI"

import toast from 'react-hot-toast';

import {
  FormInput,
  //PhoneInput,
  RequiredFormInput,
} from "../components/form_inputs/formInputs.js";

const Profile = (props) => {
  // Desestructuramos los props:
  const { userData, userDataHook } = props;

  // Función que maneja el submit del formulario, actualiza el objeto global userData.
  const handleProfileSubmit = (event) => {
    event.preventDefault();
    const e = event.target;

    UserAPI.put(
      userData.id,
      e.first_name.value, 
      e.last_name.value,
      e.email.value,
      userData.username,
      userData.password,
    ).then( (data) => {
      userData.first_name = e.first_name.value;
      userData.last_name = e.last_name.value;      
      userData.email = e.email.value;

      userDataHook(userData);
      sessionStorage.setItem('userDataEcommerce', JSON.stringify(userData))
      console.table(userData);
      toast.success("🥳 ¡Datos actualizados!");
    }).catch( error => {
      console.log(error);
      toast.error(JSON.stringify(error.response.data));
    });

  };

  // Función que maneja el submit del formulario, actualiza el objeto global userData.
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const e = event.target
    if (e.newPassword.value !== e.repeatNewPassword.value) {
      // Previene que las contraseñas ingresadas sean distinas
      toast.error("😬 Las contraseñas no coinciden");

    } else {
      UserAPI.put(
        userData.id,
        userData.first_name, 
        userData.last_name,
        userData.email,
        userData.username,
        e.newPassword.value,
      ).then( (data) => {
        userData.password = e.newPassword.value;
        userDataHook(userData);
        sessionStorage.setItem('userDataEcommerce', JSON.stringify(userData))
        console.table(userData);
        toast.success("🥳 ¡Contraseña actualizada!");
      }).catch( error => {
        console.log(error);
        toast.error(JSON.stringify(error.response.data));
      });
    }
  };

  return (
    <div className={styles.formsContainer}>
      <div className={styles.userProfileContainer}>
        <div className={styles.initialMessage}>
          <h1>User Profile</h1>
        </div>
        <form
          className={[styles.userProfileForm, styles.formCommon].join(" ")}
          onSubmit={handleProfileSubmit}
        >
          {FormInput("First name", "text", userData.first_name, 'first_name')}
          {FormInput("Last name", "text", userData.last_name, 'last_name')}
          {/* {RequiredFormInput("**Username", "text", userData.username, 'username')} */}
          {RequiredFormInput("**Email", "email", userData.email, 'email')}
          {/* {PhoneInput("**Phone", userData.phone, 'phone')}
          <p>[Delivery address]</p>
          {FormInput("Country:", "text", userData.country, 'country')}
          {FormInput("Province - State:", "text", userData.provinceState, 'provinceState')}
          {FormInput("City:", "text", userData.city, 'city')}
          {FormInput("Postal Code:", "text", userData.postalCode, 'postalCode')} */}
          <input
            className={styles.submitButton}
            type="submit"
            value="Update profile"
          />
        </form>
      </div>
      <div className={styles.passwordFormContainer}>
        <div className={styles.initialMessage}>
          <h1>Change Password</h1>
        </div>
        <form
          className={[styles.passwordForm, styles.formCommon].join(" ")}
          onSubmit={handlePasswordSubmit}
        >
          {/* {RequiredFormInput("**Actual Password", "password", "","actualPassword")} */}
          {RequiredFormInput("**New Password", "password", "", "newPassword" )}
          {RequiredFormInput("**Repeat new password", "password", "", "repeatNewPassword")}
          <input
            className={styles.passwordSubmitButton}
            type="submit"
            value="Password Reset"
          />
        </form>
      </div>
    </div>
  );
};
export default Profile;
