import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { UserContext } from "../../Components/Dataprovide/DataProvider";
import QuestionDetail from "../QuestionDetail/QuestionDetail";
import "./Allquestion.css";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Homepage() {
  const [userData] = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [displayedQuestions, setDisplayedQuestions] = useState(10);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/questions/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userid: userData.userid },
      });
      setQuestions(response.data.questions);
      console.log(response.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData?.userid) {
      fetchQuestions();
    }
  }, [userData]);

  const handleDeleteQuestion = (questionid) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.questionid !== questionid)
    );
  };

  const seeMore = () => {
    setDisplayedQuestions((prevCount) => prevCount + 10); 
  };

  // Handle showing less questions
  const seeLess = () => {
    setDisplayedQuestions(10); 
  };
  return (
    <Layout>
      <div className="container">
        <div className="homepage">
          <div className="head">
            <div className="row askque">
              <div className="col-md-6">
                <button className="qb" onClick={() => navigate("/question")}>
                  Ask Question
                </button>
              </div>
              <div className="col-md-6">
                <h4 className="wel text-md-end">
                  Welcome: {userData && userData.username}
                </h4>
              </div>
            </div>
          </div>
          <h3 className="ns">Questions</h3>
        </div>
        <div>
          {questions?.slice(0, displayedQuestions).map((question, i) => (
            <QuestionDetail
              question={question}
              key={i}
              onDelete={handleDeleteQuestion}
            />
          ))}
          {displayedQuestions < questions.length && (
            <button onClick={seeMore}>See More</button>
          )}
          {displayedQuestions > 15 && (
            <button c onClick={seeLess}>
              See Less
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Homepage;
