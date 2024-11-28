async function postProject(
  title,
  description,
  goal,
  image,
  isOpen,
  dateCreated
) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  const token = window.localStorage.getItem("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: title,
      description: description,
      goal: goal,
      image: image,
      is_open: isOpen,
      date_created: dateCreated,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error creating a project`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postProject;
