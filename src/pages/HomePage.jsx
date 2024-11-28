import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { useAuth } from "../hooks/use-auth";
import useProjects from "../hooks/use-projects";
import "./HomePage.css";

function HomePage() {
  const { auth, setAuth } = useAuth();
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <div id="project-list">
        {projects.map((projectData, index) => {
          return <ProjectCard key={index} projectData={projectData} />;
        })}
      </div>
      {auth.token ? (
        <ProjectForm />
      ) : (
        <div>Login to create your own project</div>
      )}
    </>
  );
}

export default HomePage;
