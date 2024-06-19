import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken === undefined) {
      navigate("/leaderboard", { replace: true });
    }
  });

  return (
    <>
      {/* {console.log("pro   "+props.csvData)} */}
      <NavBar download = {props.csvData}/>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
