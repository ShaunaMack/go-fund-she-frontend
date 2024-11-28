import { createContext, useState, useEffect } from "react";
import getCurrentUser from "../api/get-current-user";

/* eslint-disable react/prop-types */
// Here we create the Context
export const AuthContext = createContext();

// Here we create the component that will wrap our app, this means all it children can access the context using are hook.
export const AuthProvider = (props) => {
  // Using a object for the state here, this way we can add more properties to the state later on like user id.
  const [auth, setAuth] = useState({
    // Here we initialize the context with the token from local storage, this way if the user refreshes the page we can still have the token in memory.
    token: window.localStorage.getItem("token"),
    user: null, // Initialize with null to indicate user data is not yet loaded
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update the user in auth when it's loaded
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!auth.token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser(auth.token);
        setAuth((prevAuth) => ({ ...prevAuth, user: userData }));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, error }}>
      {props.children}
    </AuthContext.Provider>
  );
};
