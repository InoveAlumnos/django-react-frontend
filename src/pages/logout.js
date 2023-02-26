import { Navigate } from "react-router-dom";
import { useEffect } from "react"

const Logout = (props) => {
  const { auth, setAuthHook } = props;

  const handler = () => {
    sessionStorage.removeItem("userDataEcommerce");
    //setAuthHook(false);
    window.location = "/login"
  }

  useEffect(() => {
    handler()
  }, [])

  // return <Navigate to="/login">{handler()}</Navigate>;
  return <></>
};
export default Logout;
