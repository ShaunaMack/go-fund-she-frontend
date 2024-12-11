import { useNavigate, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import PledgeForm from "../components/PledgeForm";
import { useAuth } from "../hooks/use-auth";
import deleteProject from "../api/delete-project";
import UpdateProjectForm from "../components/UpdateProjectForm";
import Button from "../components/Button";

import "./ProjectPage.css";

function ProjectPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    try {
      await deleteProject(id, auth.token);
      alert("Project deleted successfully.");
      navigate("/");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert(err.message);
    }
  };

  const handleLoginClick = () => navigate("/login");

  const isOwner = auth.user?.id === project.owner;

  return (
    <div>
      <h1>{project.title}</h1>
      <h3>
        Date Created: {new Date(project.date_created).toLocaleDateString()}
      </h3>
      <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
      <h3>Pledges:</h3>

      <div>
        {project.pledges.length > 0 ? (
          <ul className="pledge-list">
            {project.pledges.map((pledge, key) => (
              <li className="pledge-item" key={key}>
                <span className="pledge-amount">${pledge.amount}</span> from{" "}
                <span className="pledge-supporter">
                  {pledge.anonymous
                    ? "Anonymous"
                    : project.userMap[pledge.supporter] || "Unknown"}
                </span>
                <p className="pledge-comment">{pledge.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-pledges-message">
            There are no pledges for this project.
          </div>
        )}
      </div>

      {project.is_open && !auth.token && (
        <Button onClick={handleLoginClick}>
          Login to make a pledge to this project
        </Button>
      )}
      <div className="form-container">
        {project.is_open && auth.token && (
          <PledgeForm projectId={project.id} projectTitle={project.title} />
        )}

        {isOwner && (
          <div>
            <UpdateProjectForm project={project} token={auth.token} />
            <Button onClick={handleDelete} color="var(--warningColor)">
              Delete Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
