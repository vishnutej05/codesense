import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import './index.css'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBFooter,
  MDBIcon
} from "mdb-react-ui-kit";

const Forgot = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [OTP, setOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [verificationError, setVerificationError] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent

  useEffect(() => {
    generateOTP();
  }, []); // Run once on mount

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken !== undefined) {
      navigate("/contests", { replace: true });
    }
  }, [navigate]); // Only run this effect when navigate changes

  const generateOTP = async () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    setOTP(generatedOTP.toString());
  };

  const submitClicked = async (event) => {
    event.preventDefault();

    const emailData = { email, OTP };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    };

    try {
      const res = await fetch(
        "http://localhost:8800/sendotp",
        options
      );

      if (!res.ok) {
        throw new Error("Error");
      }

      console.log(res);
    } catch (error) {
      console.error("Error:", error);
    }

    // Generate OTP when form is submitted
    setOtpSent(true); // Set otpSent to true after sending OTP
  };

  const verifyOTP = async () => {
    if (enteredOTP === OTP) {
      const emailData = { email };
      const options = {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await fetch(
          "http://localhost:8800/getcreds",
          options
        );

        if (!res.ok) {
          throw new Error("Error");
        }

        setData(await res.json());

        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
      console.log("OTP verification successful", data);
    } else {
      setVerificationError("Invalid OTP. Please try again.");
    }
  };

  return (
  <>
    <NavBar></NavBar>
      <div style = {{ height : "100vh",backgroundColor:"#8C52FF", paddingTop:"10%"}} className="d-flex justify-content-center ">
        {!otpSent && (
        <form onSubmit={submitClicked}>
        <MDBCard>
        <MDBCardBody style={{ paddingTop: "8%",backgroundColor: "#8C52FF" }}>
          <MDBContainer fluid className=" h-custom">
            <MDBRow>
              <MDBCol md="5"style = {{width:"100%"}} className="text-center">
              <h1 className="mb-3" style={{ fontSize:"40px", color:"black" }}>
                Forgot Credentials
              </h1>

              <MDBInput
                label="Enter your email"
                id="formControlLg"
                size="lg"
                style={{ backgroundColor: "white" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

              <MDBBtn type="submit" className="btn wide-btn mt-3">Get OTP</MDBBtn>
            </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
        </MDBCard>
        </form>
        )}
        {otpSent && (
          <MDBCard>
          <MDBCardBody style={{backgroundColor: "#8C52FF" }}>
            <MDBContainer fluid className=" h-custom">
              <MDBRow>
                <MDBCol md="5" style = {{width:"100%"}} className="text-center">
                {/* <div style={{ paddingTop: "100px" }}> */}
                  <h1 className="mb-3 text-start" style={{ fontSize:"40px", color:"black" }}>
                    Enter OTP
                  </h1> 
                  <MDBInput
                  label="Enter your email"
                  id="formControlLg"
                  size="lg"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  value={enteredOTP}
                  onChange={(e) => setEnteredOTP(e.target.value)}
                  placeholder="Enter OTP"
                />

                <MDBBtn onClick={verifyOTP} className="btn wide-btn">Login</MDBBtn>
                  {verificationError && (
                    <p style={{ paddingTop: "100px" }}>{verificationError}</p>
                  )}
                  {setOtpSent && 
                    <p style={{fontSize:"40px", color:"black"}} className="text-center">{data.password}</p>
                    // api call to send userid pass to mail 
                  }
                {/* </div> */}
              </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
          </MDBCard>
          
        )}
      </div>
    </>
  );
}

export default Forgot;
