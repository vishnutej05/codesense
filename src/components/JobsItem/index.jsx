/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./index.css";

const JobsItem = (props) => {
  const { jobDetails } = props;
  const { position, company, location, agoTime, jobUrl } = jobDetails;

  return (
    <li className="jobs-list">
      <div className="jobs-div">
        <p className="job-position jobs-text">
          Role - <b>{position}</b>
        </p>
        <div className="comp-link-div">
          <p className="job-company jobs-text">
            Company - <b>{company}</b>
          </p>
          <Link className="link-job" to={jobUrl} target="_blank">
            Apply Here
          </Link>
        </div>
        <p className="job-location jobs-text">
          Location - <b>{location}</b>
        </p>
        <p className="job-posted-time jobs-text">Posted {agoTime}</p>
      </div>
    </li>
  );
};

export default JobsItem;
