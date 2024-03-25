import Template from "../Components/Template";
import loginImg from "../assets/login.png";

function Login({ setIsLoggedIn }) {
  return (
   <div >
     <Template
      title="Welcome Back"
      description1="Increase your crop growth and keep a track of your crop."
      description2="Industrialising crop production through technology."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
      
    />
   </div>
  );
}

export default Login;
