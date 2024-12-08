import { useState } from "react";
import updateProject from "../api/update-project";
import Button from "./Button";

/* eslint-disable react/prop-types */
function UpdateProjectForm({ project, token }) {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    goal: project.goal,
    image: project.image,
    isOpen: project.isOpen,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateProject(project.id, formData, token);
      alert("Project updated successfully.");
    } catch (err) {
      console.error("Error updating project:", err);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          value={formData.goal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div className="checkbox-wrapper">
        <label htmlFor="isOpen">
          <input
            type="checkbox"
            id="isOpen"
            checked={formData.isOpen}
            onChange={handleChange}
          />
          Open for pledges
        </label>
      </div>
      <Button type="submit">Update Project</Button>
    </form>
  );
}

export default UpdateProjectForm;
