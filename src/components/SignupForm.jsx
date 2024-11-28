import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import postSignup from "../api/post-signup.js";

function SignupForm() {
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    event.preventDefault();
    const { username, email, password } = credentials;

    if (username && email && password) {
      postSignup(username, email, password)
        .then(() => {
          // After successful sign-up, log in the user
          return postLogin(username, password);
        })
        .then((loginResponse) => {
          // Save the token and navigate to the home page
          window.localStorage.setItem("token", loginResponse.token);
          navigate("/");
        });
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
      <button type="submit" onClick={handleSubmit}>
        Sign up
      </button>
    </form>
  );
}

export default SignupForm;
