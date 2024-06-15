// import { useState, useEffect } from "react";
import ContestItem from "../ContestItem";
import "./index.css";

const Contests = () => {
  //   const [contestsList, setContestsList] = useState({});

  //   useEffect(() => {
  //     const fetchContests = async () => {
  //       try {
  //         const response = await fetch("url");
  //         const data = await response.json();
  //         setContestsList(data);
  //       } catch (error) {
  //         console.log("Error Fetching Constests", error);
  //       }
  //     };

  //     fetchContests();
  //   }, []);

  const contestsList = {
    "Ongoing Contests": [
      {
        contest: "Starters 131",
        host: "codechef.com",
        duration: "2 hours",
        start: "2024-04-24 20:00:00",
        end: "2024-04-24 22:00:00",
        href: "https://www.codechef.com/START131",
      },
      {
        contest: "Educational Codeforces Round 164 (Rated for Div. 2)",
        host: "codeforces.com",
        duration: "2 hours",
        start: "2024-04-12 20:05:00",
        end: "2024-04-12 22:05:00",
        href: "https://codeforces.com/contests/1954",
      },
    ],
    "upcoming Contests": [
      {
        contest: "Codeforces Global Round 25",
        host: "codeforces.com",
        duration: "3 hours",
        start: "2024-04-06 20:05:00",
        end: "2024-04-06 23:05:00",
        href: "https://codeforces.com/contests/1951",
      },
      {
        contest: "Weekly Contest 392",
        host: "leetcode.com",
        duration: "1 hours",
        start: "2024-04-07 08:00:00",
        end: "2024-04-07 09:30:00",
        href: "https://leetcode.com/contest/weekly-contest-392",
      },
      {
        contest: "Educational Codeforces Round 164 (Rated for Div. 2)",
        host: "codeforces.com",
        duration: "2 hours",
        start: "2024-04-12 20:05:00",
        end: "2024-04-12 22:05:00",
        href: "https://codeforces.com/contests/1954",
      },
      {
        contest: "Starters 131",
        host: "codechef.com",
        duration: "2 hours",
        start: "2024-04-24 20:00:00",
        end: "2024-04-24 22:00:00",
        href: "https://www.codechef.com/START131",
      },
      {
        contest:
          "2023 Post World Finals Online ICPC Challenge powered by Huawei",
        host: "codeforces.com",
        duration: "14 days",
        start: "2024-05-06 20:30:00",
        end: "2024-05-20 20:30:00",
        href: "https://codeforces.com/contests/1953",
      },
      {
        contest: "Starters 138",
        host: "codechef.com",
        duration: "2 hours",
        start: "2024-06-12 20:00:00",
        end: "2024-06-12 22:00:00",
        href: "https://www.codechef.com/START138",
      },
    ],
  };

  return (
    <div className="contests-div">
      <div className="contest-card">
        <div className="up-on-card">
          <h1 className="ongoingText">Ongoing Contests</h1>
          <hr />
          {contestsList["Ongoing Contests"].length === 0 ? (
            <p className="no-ongoing-text">None</p>
          ) : (
            <ul className="ul-contest">
              {contestsList["Ongoing Contests"].map((eachContest) => (
                <ContestItem
                  key={eachContest.href}
                  contestDetails={eachContest}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="up-on-card">
          <h1 className="ongoingText">Upcoming Contests</h1>
          <hr />
          {contestsList["upcoming Contests"].length === 0 ? (
            <p className="no-ongoing-text">None</p>
          ) : (
            <ul className="ul-contest">
              {contestsList["upcoming Contests"].map((eachContest) => (
                <ContestItem
                  key={eachContest.href}
                  contestDetails={eachContest}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contests;
