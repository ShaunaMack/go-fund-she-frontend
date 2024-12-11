import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";

import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import Button from "../components/Button";

import "./HomePage.css";

function HomePage() {
  const { auth } = useAuth();
  const { projects, isLoading, error } = useProjects();
  const navigate = useNavigate();

  const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleLoginClick = () => navigate("/login");

  return (
    <div>
      <div id="project-list">
        {projects.map((projectData, index) => (
          <ProjectCard key={index} projectData={projectData} />
        ))}
      </div>
      {auth.token ? (
        showCreateProjectForm ? (
          <div className="form-container">
            <ProjectForm />
            <Button onClick={() => setShowCreateProjectForm(false)}>
              Close Form
            </Button>
          </div>
        ) : (
          <Button onClick={() => setShowCreateProjectForm(true)}>
            Create a New Project
          </Button>
        )
      ) : (
        <Button onClick={handleLoginClick}>
          Login to create your own project
        </Button>
      )}
    </div>
  );
}

export default HomePage;
