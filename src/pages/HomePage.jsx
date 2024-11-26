import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/use-projects";
import "./HomePage.css";

function HomePage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div id="project-list">
      {projects.map((projectData, index) => {
        return <ProjectCard key={index} projectData={projectData} />;
      })}
    </div>
  );
}

export default HomePage;
