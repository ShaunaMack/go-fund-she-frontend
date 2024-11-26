import ProjectCard from "../components/ProjectCard";
import { allProjects } from "../data";
import "./HomePage.css";

function HomePage() {
  return (
    <div id="project-list">
      {allProjects.map((projectData, index) => {
        return <ProjectCard key={index} projectData={projectData} />;
      })}
    </div>
  );
}

export default HomePage;
