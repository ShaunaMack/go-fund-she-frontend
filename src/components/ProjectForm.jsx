import { useState } from "react";
import postProject from "../api/post-project.js";
import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

import {
  required,
  positiveInteger,
  urlValid,
  maxLength,
  VALID,
} from "../utils/validators.js";

function ProjectForm() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    goal: 0,
    image: "",
    isOpen: true,
  });

  const [errors, setErrors] = useState({
    title: VALID,
    description: VALID,
    goal: VALID,
    image: VALID,
  });

  // Validators for each field
  const validators = {
    title: required("Title is required."),
    description: required("Description is required."),
    goal: (value) =>
      required("Goal is required.")(value) ||
      positiveInteger("Goal must be a positive integer.")(value),
    image: (value) =>
      required("Image URL is required.")(value) ||
      urlValid("Image must be a valid URL.")(value) ||
      maxLength("Image URL must be 200 characters or less.", 200)(value),
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      [id]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validators[id] ? validators[id](value) : VALID,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields
    const newErrors = Object.keys(validators).reduce((acc, field) => {
      const error = validators[field](projectData[field]);
      return { ...acc, [field]: error };
    }, {});

    setErrors(newErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some((error) => error !== VALID);
    if (hasErrors) return;

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
      <h2>Create a New Project</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
          value={projectData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter project description"
          value={projectData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
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
        {errors.goal && <p className="error">{errors.goal}</p>}
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
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      <div className="checkbox-wrapper">
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
