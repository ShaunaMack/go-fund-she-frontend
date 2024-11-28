async function deleteProject(projectId, token) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const fallbackError = `Error deleting project with id ${projectId}`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return true; // Return true so we know it was successfully deleted
}

export default deleteProject;
