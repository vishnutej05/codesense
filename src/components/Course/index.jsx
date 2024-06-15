// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button } from "react-bootstrap";

// const AllCourses = () => {
//   // const [courses, setCourses] = useState([]);

//   // useEffect(() => {
//   //   // Fetch courses from the backend
//   //   axios
//   //     .get("http://localhost:3000/api/courses/showcourses")
//   //     .then((response) => {
//   //       setCourses(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching courses:", error);
//   //     });
//   // }, []);

//   const course = [
//     {
//       courseid: "CS101",
//       coursetags: ["programming", "web development"],
//       title: "Introduction to Programming",
//       description:
//         "This course provides an introduction to programming concepts using a variety of programming languages.",
//     },
//     {
//       courseid: "C002",
//       coursetags: ["data science", "machine learning"],
//       title: "Data Science Fundamentals",
//       description:
//         "Explore the foundations of data science, including data analysis, statistics, and machine learning techniques.",
//     },
//     {
//       courseid: "C003",
//       coursetags: ["mobile development", "iOS"],
//       title: "iOS App Development",
//       description:
//         "Learn to develop native iOS applications using Swift programming language and iOS development tools.",
//     },
//   ];

//   return (
//     <div className="container">
//       <h1>All Courses</h1>
//       <div className="row">
//         {course.map((course) => (
//           <div key={course.courseid} className="col-md-4 mb-3">
//             <Card>
//               {/* <Card.Img variant="top" src={course.picture} /> */}
//               <Card.Body>
//                 <Card.Title>{course.title}</Card.Title>
//                 <Card.Text>{course.coursetags}</Card.Text>
//                 <Card.Text>{course.description}</Card.Text>
//                 <Button variant="primary">View Details</Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllCourses;
