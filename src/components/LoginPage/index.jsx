import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LottieAnimation from "../../components/LottieAnimation"; // Import the component
import Animation from "../Animation";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { yellow } from "@mui/material/colors";

const LoginPage = () => {
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken !== undefined) {
      navigate("/contests", { replace: true });
    }
  });

  const navigate = useNavigate();
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const [rollno, setRollno] = useState("");
  const [password, setPass] = useState("");

  const submitClicked = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const userDetails = { rollno, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(
        // "https://scoretracking-vishnu.onrender.com/authenticate",
        "http://localhost:8800/authenticate",
        options
      );
      const data = await res.json();

      if (res.ok === true) {
        submitSuccess(data.jwtToken);
      } else {
        setIncorrectCredentials(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const submitSuccess = (jwtToken) => {
    Cookies.set("jwtToken", jwtToken, {
      expires: 30,
      path: "/",
    });
    navigate("/leaderboard", { replace: true });
  };

  // const animationSrc =
  //   "https://lottie.host/d01a53d2-5dfb-49be-8dd4-5da9bc887cd2/9qciwN240m.json";
    
  return (
    <>
    <NavBar/>
    <div style={{ display: "flex"}}>
      <MDBCard style={{width: "100%" }}>
        <form onSubmit={submitClicked}>
          <MDBCardBody style={{ paddingTop: "8%",backgroundColor: "#FBFA92" }}>
            <MDBContainer fluid className=" h-custom">
              <MDBRow>
                <MDBCol
                  col="10"
                  md="6"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: "10%",
                    }}
                  >
                  <Animation/>
                  </div>
                </MDBCol>

                {/* login card */}

                <MDBCol col="4" md="6" >
                  <div style={{ padding: "5%" }}>
                    <h2 className="fw-bold mb-5 text-start">Log In</h2>

                    <MDBInput
                      wrapperClass="mb-4 "
                      label="Username"
                      id="formControlLg"
                      type="text"
                      size="lg"
                      className="input-boxes"
                      style={{ backgroundColor: "white" }}  
                      onChange={(e) => setRollno(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass="mb-4 "
                      label="Password"
                      id="formControlLg"
                      type="password"
                      size="lg"
                      className="input-boxes"
                      style={{ backgroundColor: "white" }}
                      onChange={(e) => setPass(e.target.value)}
                    />

                    {loading ? ( // Conditional rendering based on loading state
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <>
                        {incorrectCredentials && (
                          <p className="text-danger">
                            Wrong Credentials. Please try again.
                          </p>
                        )}

                        <MDBBtn type="submit">Login</MDBBtn>

                        <p className="mb-3 pb-lg-2">
                          <Link className="text-black-50" to="/forgot">
                            Forgot Password?
                          </Link>
                        </p>
                      </>
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
        </form>
      </MDBCard>
      
    </div>
    </>
  );
};

export default LoginPage;
