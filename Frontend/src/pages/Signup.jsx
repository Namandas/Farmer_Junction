import Template from "../Components/Template";
import signupImg from "../assets/signup.png";

function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Join with us to make farming a revolution"
      description1="Earn more profits and contribute to the society."
      description2=""
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Signup;
