import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import postSignup from "../api/post-signup.js";
import { useAuth } from "../hooks/use-auth.js";
import Button from "./Button.jsx";

function SignupForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = credentials;

    if (username && email && password) {
      try {
        // Sign up the user
        await postSignup(username, email, password);
        // Log in the user
        const loginResponse = await postLogin(username, password);
        // Save the token and navigate to the home page
        window.localStorage.setItem("token", loginResponse.token);
        setAuth({
          token: loginResponse.token,
        });
        navigate("/");
      } catch (error) {
        console.error("Error during sign-up or login:", error.message);
        // TODO: decide what to show user if there is an error signing in
      }
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Sign up
      </Button>
    </form>
  );
}

export default SignupForm;
