import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import useCurrentUser from "../hooks/use-current-user";
import Button from "../components/Button";

function UserPage() {
  const navigate = useNavigate();
  const { auth } = useAuth(); // Get the token from AuthContext
  const { user, isLoading, error } = useCurrentUser(auth?.token);

  // Redirect to login if the token is missing
  if (!auth?.token) {
    return (
      <div>
        <p>You must be logged in to view your dashboard.</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>{error || "An error occurred while loading your data."}</p>;
  }

  return (
    <div>
      <h1>{user.username}'s Dashboard</h1>

      {/* Projects Section */}
      <h2>Your Projects</h2>
      {user.projects.length > 0 ? (
        <ul>
          {user.projects.map((project) => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Goal: ${project.goal}</p>
              <p>
                Created at: {new Date(project.date_created).toLocaleString()}
              </p>
              <p>Status: {project.is_open ? "Open" : "Closed"}</p>
              <Button onClick={() => navigate(`/project/${project.id}`)}>
                View Project
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not created any projects yet.</p>
      )}

      {/* Pledges Section */}
      <h2>Your Pledges</h2>
      {user.pledges.length > 0 ? (
        <ul>
          {user.pledges.map((pledge) => (
            <li key={pledge.id}>
              <p>
                Pledged ${pledge.amount} to {pledge.project.title}
              </p>
              <p>{pledge.anonymous ? "Anonymous" : `By: ${user.username}`}</p>
              <p>Comment: {pledge.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not made any pledges yet.</p>
      )}
    </div>
  );
}

export default UserPage;
