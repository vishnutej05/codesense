// import { useState, useEffect } from "react";
import JobsItem from "../JobsItem";
import "../Contests/index.css";

const JobsPage = () => {
  //   const [jobs, setJobs] = useState([]);

  //   useEffect(() => {
  //     const fetchJobs = async () => {
  //       try {
  //         const data = await fetch("url");
  //         const res = await data.json();
  //         setJobs(res);
  //       } catch (error) {
  //         console.log("Error", error);
  //       }
  //     };

  //     fetchJobs();
  //   }, []);

  const jobs = [
    {
      position: "Python Development Internship",
      company: "Datametrics Technologies",
      location: "India",
      agoTime: "2 days ago",
      jobUrl:
        "https://in.linkedin.com/jobs/view/python-developer-%40intern-any-graduate-at-datametrics-technologies-3877538777?position=1&pageNum=0&refId=P7pLpgeegGCf1MeY3pUrQw%3D%3D&trackingId=ZZdMuJcbUb3lDxnHeNn6FQ%3D%3D&trk=public_jobs_jserp-result_search-card",
    },
    {
      position: "Front End Developer",
      company: "Bluecore",
      location: "India",
      agoTime: "3 days ago",
      jobUrl:
        "https://in.linkedin.com/jobs/view/front-end-developer-at-bluecore-3878114272?position=2&pageNum=0&refId=P7pLpgeegGCf1MeY3pUrQw%3D%3D&trackingId=Ay9DOaFWBH5giCpd1Y5wQw%3D%3D&trk=public_jobs_jserp-result_search-card",
    },
    {
      position: "React JS Developer",
      company: "OpenGrowth",
      location: "India",
      agoTime: "6 days ago",
      jobUrl:
        "https://in.linkedin.com/jobs/view/react-js-developer-at-opengrowth-3881247056?position=3&pageNum=0&refId=P7pLpgeegGCf1MeY3pUrQw%3D%3D&trackingId=4xLEHx9C26wL20hT5raZyg%3D%3D&trk=public_jobs_jserp-result_search-card",
    },
  ];

  return (
    <div className="contests-div">
      <div className="contest-card">
        <div className="up-on-card">
          <h1 className="ongoingText">Apply for Jobs</h1>
          <hr />
          {jobs.length === 0 ? (
            <p className="no-ongoing-text">None</p>
          ) : (
            <ul className="ul-contest">
              {jobs.map((eachJob) => (
                <JobsItem key={eachJob.jobUrl} jobDetails={eachJob} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
