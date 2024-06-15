import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
// import NavBar from "../NavBar";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken === undefined) {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      {/* <NavBar /> */}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
