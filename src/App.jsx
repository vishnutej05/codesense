import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataTable from "./components/DataTable";
import api from "./api/axiosConfig";
import ProfilePage from "./components/Profile";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import CourseList from "./components/CourseList";
import Contests from "./components/Contests";
import JobsPage from "./components/JobsPage";
import Forgot from "./components/Forgot";
import Personal from "./components/Personal";
// import AllCourses from "./components/Course";
// import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ModulesPage from "./components/ModulesPage";
import LessonContent from "./components/LessonContent";

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get("/leaderboard", {
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xsX25vIjoiMjFyMjFhNjYxNCIsImlhdCI6MTcxMjUxMDU5NH0.Jpch2FREAiCEd4ru19lLHb279oJRRo2hqU5CNYUVWAo",
        },
      });
      console.log(response.data);
      // const sortedData = response.data.sort((a, b) => b.total - a.total);
      const sortedData = response.data;
      setData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const [stats, setStats] = useState(null);

  const username = "Pabboju Sandeep Chary";
  const getStats = async () => {
    try {
      const response = await api.get("/leaderboard");
      const person = response.data.find((person) => person.Name === username);
      setStats(person);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getStats();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
{/*do not change the route below to "/" as it is bwing used in navbar as "/login"*/}
        <Route exact path="/login" element={<LoginPage />} /> 
        <Route exact path="/forgot" element={<Forgot />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/courses" element={<CourseList />} />
          <Route
            exact
            path="/modules-page/:id/:title"
            element={<ModulesPage />}
          />

          <Route
            exact
            path="/leaderboard"
            element={<DataTable data={data} onLoad={getData} />}
          />
          <Route exact path="/lesson-page/:id" element={<LessonContent />} />
          <Route exact path="/contests" element={<Contests />} />
          <Route exact path="/jobs" element={<JobsPage />} />
          <Route
            exact
            path="/personal"
            element={<Personal data={data} onLoad={getData} />}
          />
          {/* <Route path="/courses" element={<AllCourses />} /> */}
          <Route
            exact
            path="/profile"
            element={<ProfilePage stats={stats} onLoad={getStats} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
