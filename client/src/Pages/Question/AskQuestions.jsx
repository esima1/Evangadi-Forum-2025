// Importing necessary dependencies from React and other libraries.
import React, { useContext, useState } from "react"; // React is the core library; useContext and useState are React hooks.
import styles from "./AskQuestions.module.css"; // Importing CSS module for styling the component.
import { IoIosCheckmarkCircle } from "react-icons/io"; // Importing a specific icon from react-icons.
import Layout from "../../Components/Layout/Layout"; // Importing a reusable Layout component.
import { AppState } from "../../Router"; // Importing a context, AppState, to access shared state.
import axiosBase from "../../axiosConfig"; // Axios instance configured for API calls.
import { Link, useNavigate } from "react-router-dom"; // Link provides navigation between routes, useNavigate helps programmatic navigation.

function AskQuestions() {
  // Using the useContext hook to access shared state from AppState context.
  const { userData, headerToken } = useContext(AppState);

  // Using the useState hook to manage form input data.
  const [form, setForm] = useState({
    userid: userData?.userid, // Pre-populating the `userid` from context if available.
    title: "", // Default value for title.
    description: "", // Default value for description.
  });

  // useNavigate hook from React Router DOM to programmatically navigate between routes.
  const navigate = useNavigate();

  // Function to handle form field changes.
  const handleChange = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value })); // Updating the form state dynamically based on the input field's name and value.
  };

  // Function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default browser behavior (page refresh).

    // Validates if user data exists before making the API call.

    try {
      // Sends a POST request to create a new question using axiosBase.
      await axiosBase.post("/questions/", form, { ...headerToken });

      // Navigates back to the home page upon successful submission.
      navigate("/");
    } catch (error) {
      console.log(error.response); // Logs the error response for debugging.
    }
  };

  // JSX structure for rendering the UI.
  return (
    <Layout>
      {/* Main container for the question form */}
      <div className={styles.question_container}>
        {/* Wrapper for form and instructional steps */}
        <div className={styles.question_wrapper}>
          {/* Instructional steps for writing a good question */}
          <div className={styles.question_steps}>
            <h3>Steps to write a good question.</h3>
            <ul className={styles.question_li}>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />{" "}
                  {/* Icon for visual representation */}
                </div>
                <div>Summarize your problems in a one-line title.</div>{" "}
                {/* First instructional step */}
              </li>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />
                </div>
                <div>Describe your problem in more detail.</div>{" "}
                {/* Second instructional step */}
              </li>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />
                </div>
                <div>
                  Describe what you have tried and what you expected to happen.{" "}
                  {/* Third instructional step */}
                </div>
              </li>
              <li>
                <div>
                  <IoIosCheckmarkCircle color="#35355E" size={25} />
                </div>
                <div>Review your question and post it to the site.</div>{" "}
                {/* Fourth instructional step */}
              </li>
            </ul>
          </div>

          {/* Form container */}
          <div className={styles.question_form}>
            <h4 className={styles.question_post_your}>Ask a public question</h4>{" "}
            {/* Header */}
            <h4>
              <Link className={styles.question_post_link} to="/">
                Go to Question Page{" "}
                {/* Link to navigate back to question page */}
              </Link>
            </h4>
            {/* Form for posting a question */}
            <form onSubmit={handleSubmit}>
              {/* Input field for the question title */}
              <input
                className={styles.question_title}
                type="text"
                name="title"
                placeholder="Title" // Placeholder text for the title input.
                value={form.title} // Controlled input tied to the `form.title` state.
                onChange={handleChange} // Updates state on change.
                required // Ensures the field is required.
              />
              {/* Text area for the question description */}
              <textarea
                rows={4}
                className={styles.question_description}
                placeholder="Question Description..."
                name="description" // Maps the input to `description` in the state.
                value={form.description} // Controlled input tied to the `form.description` state.
                onChange={handleChange} // Updates state on change.
                required // Ensures the field is required.
              />
              {/* Submit button */}
              <span>
                <button className={styles.question_button} type="submit">
                  Post Your Question
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AskQuestions; // Exporting the component as the default export.
