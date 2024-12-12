import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import postSignup from "../api/post-signup.js";
import { useAuth } from "../hooks/use-auth.js";
import Button from "./Button.jsx";

import {
  VALID,
  required,
  minLength,
  emailFormatValid,
  PASSWORD_MIN_LENGTH,
} from "../utils/validators.js";

function SignupForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: VALID,
    email: VALID,
    password: VALID,
  });

  const validators = {
    username: required("Username is required."),
    email: (value) =>
      required("Email is required.")(value) ||
      emailFormatValid("Invalid email format.")(value),
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
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
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
        Sign up
      </Button>
    </form>
  );
}

export default SignupForm;
