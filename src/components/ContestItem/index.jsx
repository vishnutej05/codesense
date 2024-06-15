/* eslint-disable react/prop-types */
// import "./index.css";
// import { format } from "date-fns";
// import { Link } from "react-router-dom";

// const ContestItem = (props) => {
//   const { contestDetails } = props;
//   const { contest, host, duration, start, end, href } = contestDetails;

//   const imgLink = () => {
//     if (host === "codeforces.com") {
//       return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/a2c894be-5a6a-4c11-1815-3ba50e774d00/public";
//     } else if (host === "leetcode.com") {
//       return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/2c7bedad-a8f0-4401-d78e-b0c536ba6800/public";
//     } else if (host === "codechef.com") {
//       return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/f40d9db1-102b-4ed3-b937-66c52158a200/public";
//     }
//   };

//   const formatTime = (timeString) => {
//     return format(new Date(timeString), "eeee, d MMM yyyy p");
//   };

//   return (
//     <li className="contest-list">
//       <img className="contest-img" src={imgLink()} />
//       <div>
//         <Link className="contest-text contest-title" to={href} target="_blank">
//           {contest}
//         </Link>
//         <p className="contest-text">
//           Time: <b>{formatTime(start)}</b>
//         </p>
//         <p className="contest-text">
//           Duration: <b>{duration}</b>
//         </p>
//       </div>
//     </li>
//   );
// };

// export default ContestItem;

import "./index.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ContestItem = (props) => {
  const { contestDetails } = props;
  const { contest, host, duration, start, href } = contestDetails;

  const imgLinkDesktop = () => {
    if (host === "codeforces.com") {
      return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/a2c894be-5a6a-4c11-1815-3ba50e774d00/public";
    } else if (host === "leetcode.com") {
      return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/2c7bedad-a8f0-4401-d78e-b0c536ba6800/public";
    } else if (host === "codechef.com") {
      return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/f40d9db1-102b-4ed3-b937-66c52158a200/public";
    }
  };

  const imgLinkMobile = () => {
    if (host === "codeforces.com") {
      return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/524f120d-8495-4627-da2d-fc335e65c900/800p";
    } else if (host === "leetcode.com") {
      return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/4b051d10-3321-4d61-4ab6-253a7ecc6900/800p";
    } else if (host === "codechef.com") {
      return "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/cf4124cc-147f-410c-bf64-2841ed38c200/800p";
    }
  };

  const formatTime = (timeString) => {
    return format(new Date(timeString), "eeee, d MMM yyyy p");
  };

  return (
    <li className="contest-list">
      <img
        className="contest-img"
        src={window.innerWidth > 600 ? imgLinkDesktop() : imgLinkMobile()}
      />
      <div>
        <Link className="contest-text contest-title" to={href} target="_blank">
          {contest}
        </Link>
        <p className="contest-text">
          Time: <b>{formatTime(start)}</b>
        </p>
        <p className="contest-text">
          Duration: <b>{duration}</b>
        </p>
      </div>
    </li>
  );
};

export default ContestItem;
