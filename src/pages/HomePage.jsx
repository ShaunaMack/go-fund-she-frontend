import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { useAuth } from "../hooks/use-auth";
import useProjects from "../hooks/use-projects";
import "./HomePage.css";

function HomePage() {
  const { auth } = useAuth();
  const { projects, isLoading, error } = useProjects();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleLoginClick = () => navigate("/login");
  return (
    <>
      <div className="form-container">
        <div id="project-list">
          {projects.map((projectData, index) => {
            return <ProjectCard key={index} projectData={projectData} />;
          })}
        </div>
        {auth.token ? (
          <div>
            <h2>Create A New Project</h2>
            <ProjectForm />
          </div>
        ) : (
          <Button onClick={handleLoginClick}>
            Login to create your own project
          </Button>
        )}
      </div>
    </>
  );
}

export default HomePage;
