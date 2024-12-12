import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import Button from "./Button.jsx";

import {
  VALID,
  required,
  minLength,
  PASSWORD_MIN_LENGTH,
} from "../utils/validators.js";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: VALID,
    password: VALID,
  });

  const validators = {
    username: required("Username is required."),
    password: (value) =>
      required("Password is required.")(value) ||
      minLength(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
        PASSWORD_MIN_LENGTH
      )(value),
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validators[id](value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields
    const newErrors = Object.keys(validators).reduce((acc, field) => {
      const error = validators[field](credentials[field]);
      return { ...acc, [field]: error };
    }, {});

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== VALID);
    if (hasErrors) return;

    const { username, password } = credentials;

    if (username && password) {
      try {
        // Log in the user
        const response = await postLogin(username, password);
        // Save the token and navigate to the home page
        window.localStorage.setItem("token", response.token);
        setAuth({
          token: response.token,
        });
        navigate("/");
      } catch (error) {
        console.error("Error during login:", error.message);
        // TODO: decide what to show user if there is an error logging in
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
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
