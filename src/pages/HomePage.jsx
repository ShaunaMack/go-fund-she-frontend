import ProjectCard from "../components/ProjectCard";
import { allProjects } from "../data";

function HomePage() {
  return (
    <div>
      {allProjects.map((projectData, index) => {
        return <ProjectCard key={index} projectData={projectData} />;
      })}
    </div>
  );
}

export default HomePage;
