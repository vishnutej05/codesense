import React, { useEffect, useState } from 'react';
import CourseCard from "../CourseCard";
import "./index.css";
import Cookies from 'js-cookie';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = Cookies.get('jwtToken'); // Get the JWT token from cookies
        const response = await fetch("http://localhost:8800/user/courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "30px",
          fontSize: "40px",
          color: "purple",
        }}
      >
        My Courses
      </h1>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.courseid} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
