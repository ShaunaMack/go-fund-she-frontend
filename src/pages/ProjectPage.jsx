import { useNavigate, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import PledgeForm from "../components/PledgeForm";
import { useAuth } from "../hooks/use-auth";
import deleteProject from "../api/delete-project";
import UpdateProjectForm from "../components/UpdateProjectForm";
import Button from "../components/Button";

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

  const isOwner = auth.user?.id === project.owner;

  const makePledgeSection = auth.token ? (
    <PledgeForm projectId={project.id} />
  ) : (
    <div>Login to make a pledge to this project</div>
  );

  return (
    <div>
      <h1>{project.title}</h1>
      <h3>Created at: {project.date_created}</h3>
      <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledge, key) => (
          <li key={key}>
            {pledge.amount} from{" "}
            {pledge.anonymous
              ? "Anonymous"
              : project.userMap[pledge.supporter] || "Unknown"}
            <p>{pledge.comment}</p>
          </li>
        ))}
      </ul>
      {project.isOpen && makePledgeSection}

      {isOwner && (
        <div>
          <h2>Manage Project</h2>
          <UpdateProjectForm project={project} token={auth.token} />
          <Button onClick={handleDelete} color="var(--warningColor)">
            Delete Project
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
