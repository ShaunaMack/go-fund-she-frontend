import { allProjects } from "../data";

function HomePage() {
  return (
    <div>
      {allProjects.map((projectData, index) => {
        return <div key={index}>{projectData.title}</div>;
      })}
    </div>
  );
}

export default HomePage;
