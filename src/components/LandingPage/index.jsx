import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

import "./index.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken !== undefined) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="landDiv">
      <nav className="landNav">
        <h1>Logo</h1>
        <Button onClick={handleSignInClick} variant="contained">
          Sign In
        </Button>
      </nav>
      <div className="secondaryDiv">
        <div>
          <h3>Top Performer of the Month</h3>
        </div>
        <div>
          <h3>Top Performer of the Week</h3>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
