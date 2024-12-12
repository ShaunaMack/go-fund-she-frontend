import { useState } from "react";
import postPledge from "../api/post-pledge.js";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

import { required, positiveInteger, VALID } from "../utils/validators.js";

/* eslint-disable react/prop-types */
function PledgeForm(props) {
  const { projectId, projectTitle } = props;
  const navigate = useNavigate();
  const [pledgeData, setPledgeData] = useState({
    amount: "",
    comment: "",
    anonymous: false,
  });

  const [errors, setErrors] = useState({
    amount: VALID,
    comment: VALID,
  });

  // Validators for each field
  const validators = {
    amount: (value) =>
      required("Amount is required.")(value) ||
      positiveInteger("Amount must be a positive integer.")(value),
    comment: required("Comment is required."),
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setPledgeData((prevPledgeData) => ({
      ...prevPledgeData,
      [id]: type === "checkbox" ? checked : value, // Handle checkbox for anonymous
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
      const error = validators[field](pledgeData[field]);
      return { ...acc, [field]: error };
    }, {});

    setErrors(newErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some((error) => error !== VALID);
    if (hasErrors) return;

    const { amount, comment, anonymous } = pledgeData;
    console.log("Submitted pledgeData:", pledgeData);

    if (amount && projectId) {
      try {
        // Call the postPledge function
        await postPledge(amount, comment, anonymous, projectId);
        alert("Pledge created successfully!");
        //Reset the form after submission
        setPledgeData({
          amount: "",
          comment: "",
          anonymous: false,
        });
        navigate(0);
      } catch (error) {
        console.error("Error during pledge creation:", error.message);
        // TODO: decide what to show user if there is an error making a pledge
      }
    } else {
      alert("Amount and Project ID are required!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pledge to {projectTitle}</h2>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          step="1"
          placeholder="Enter pledge amount"
          value={pledgeData.amount}
          onChange={handleChange}
        />
        {errors.amount && <p className="error">{errors.amount}</p>}
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          placeholder="Enter a comment (optional)"
          value={pledgeData.comment}
          onChange={handleChange}
        />
        {errors.comment && <p className="error">{errors.comment}</p>}
      </div>
      <div className="checkbox-wrapper">
        <label htmlFor="anonymous">
          <input
            type="checkbox"
            id="anonymous"
            checked={pledgeData.anonymous}
            onChange={handleChange}
          />
          Pledge anonymously
        </label>
      </div>
      <Button type="submit">Create Pledge</Button>
    </form>
  );
}

export default PledgeForm;
