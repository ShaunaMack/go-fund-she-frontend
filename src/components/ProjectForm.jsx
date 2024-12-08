import { useState } from "react";
import postProject from "../api/post-project.js";
import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

function ProjectForm() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    goal: 0,
    image: "",
    isOpen: true,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, goal, image, isOpen } = projectData;
    const dateCreated = new Date().toISOString();

    if (title && description && goal > 0) {
      try {
        const response = await postProject(
          title,
          description,
          goal,
          image,
          isOpen,
          dateCreated
        );
        alert("Project created successfully!");
        console.log("Project response:", response);

        // Reset the form after submission
        setProjectData({
          title: "",
          description: "",
          goal: 0,
          image: "",
          isOpen: true,
        });
        // Reload the current page
        navigate(0);
      } catch (error) {
        console.error("Error during project creation:", error.message);
        // TODO: decide what to show user if there is an error creating a project
      }
    } else {
      alert(
        "Please fill in all required fields (title, description, and goal)."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
          value={projectData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter project description"
          value={projectData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          placeholder="Enter funding goal"
          value={projectData.goal}
          onChange={handleChange}
          min="1"
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          placeholder="Enter image URL"
          value={projectData.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="isOpen">
          <input
            type="checkbox"
            id="isOpen"
            checked={projectData.isOpen}
            onChange={handleChange}
          />
          Project is open for pledges
        </label>
      </div>
      <Button type="submit">Create Project</Button>
    </form>
  );
}

export default ProjectForm;
