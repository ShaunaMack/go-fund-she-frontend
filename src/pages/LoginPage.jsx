import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";

function LoginPage() {
  // if isLogin show the login form or else show the sign up form
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <div className="form-container">
        {isLogin ? <LoginForm /> : <SignupForm />}
        <Button onClick={toggleForm} color="var(--secondaryColor)">
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
