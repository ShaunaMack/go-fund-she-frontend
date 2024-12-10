import { useState, useEffect } from "react";
import getCurrentUser from "../api/get-current-user";

export default function useCurrentUser(token) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("No token provided.");
      setIsLoading(false);
      return;
    }

    const fetchCurrentUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getCurrentUser(token);
        setUser(userData);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.message || "Failed to fetch current user.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);

  return { user, isLoading, error };
}
