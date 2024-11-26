import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/use-projects";
import "./HomePage.css";

function HomePage() {
  const { projects } = useProjects();
  return (
    <div id="project-list">
      {projects.map((projectData, index) => {
        return <ProjectCard key={index} projectData={projectData} />;
      })}
    </div>
  );
}

export default HomePage;
