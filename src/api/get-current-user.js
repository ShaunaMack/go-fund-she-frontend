async function getCurrentUser(token) {
  const url = `${import.meta.env.VITE_API_URL}/users/me/`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const fallbackError = `Failed to fetch user details.`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json(); // Return the user data
}

export default getCurrentUser;
