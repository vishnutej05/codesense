import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.css";

const LessonContent = ({ lessonId }) => {
  const [lessonData, setLessonData] = useState(null);

  useEffect(() => {
    const fetchLessonContent = async () => {
      try {
        const response = await fetch(`http://localhost:8800/lesson/preview/${lessonId}`);
        const data = await response.json();
        setLessonData(data);
        console.log(data);
      } catch (error) {
        console.log("Error Fetching Lesson Content", error);
      }
    };

    fetchLessonContent();
  }, [lessonId]);

  return (
    <div>
      {lessonData && (
        <div className="lesson-details">
            {lessonData.text_content ? (
      <div dangerouslySetInnerHTML={{ __html: lessonData.text_content }} />
    ) : (
      lessonData.problem_id && (
        <div dangerouslySetInnerHTML={{ __html: lessonData.problem_id.problem_description }} />
      )
    )}
        </div>
      )}
    </div>
  );
};

LessonContent.propTypes = {
  lessonId: PropTypes.string.isRequired,
};

export default LessonContent;
