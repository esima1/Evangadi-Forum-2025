import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDelete } from "react-icons/md";
import "./QuestionDetail.css";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
function QuestionDetail({ question, onDelete }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const headerToken = { Authorization: `Bearer ${token}` };

  const handleClick = () => {
    if (question?.questionid) {
      navigate(`/question/${question.questionid}`);
    } else {
      console.error("No question ID available for navigation.");
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      await axiosBase.delete(`/questions/${question.questionid}`, {
        headers: headerToken,
      });
      toast.success("Question deleted successfully.");
      onDelete(question.questionid);
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete the question. can't delete this question.");
    }
  };

  return (
    <>
      <div className="header_question" onClick={handleClick}>
        <div className="question_user">
          <CgProfile className="profile" color="gray" />
          <div className="username">{question?.username}</div>
        </div>

        <div className="question_title">
          <div className="question_content">{question?.title}</div>
          <div className="question_arrow">
            <div onClick={handleDelete}>
              <MdOutlineDelete
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionDetail;
