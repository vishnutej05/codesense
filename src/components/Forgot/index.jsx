import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import './index.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const Forgot = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [OTP, setOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [verificationError, setVerificationError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    generateOTP();
  }, []);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken !== undefined) {
      navigate("/contests", { replace: true });
    }
  }, [navigate]);

  const generateOTP = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    setOTP(generatedOTP.toString());
  };

  const submitClicked = async (event) => {
    event.preventDefault();
    
    if (!email) {
      setVerificationError("Please enter an email address.");
      return;
    }

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
      setOtpSent(true);
      setVerificationError("");
    } catch (error) {
      console.error("Error:", error);
    }
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

        const data = await res.json();
        setData(data);
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
      <NavBar />
      <div style={{ height: "100vh", backgroundColor: "#8C52FF", paddingTop: "10%" }} className="d-flex justify-content-center">
        <form onSubmit={submitClicked}>
          <MDBCard style={{ width: "500px" }}>
            <MDBCardBody style={{ paddingTop: "8%", backgroundColor: "#8C52FF" }}>
              <MDBContainer fluid className="h-custom">
                <MDBRow>
                  <MDBCol style={{ width: "100%" }} className="text-center">
                    <h1 className="mb-3" style={{ fontSize: "40px", color: "black" }}>
                      {otpSent ? "Enter OTP" : "Forgot Credentials"}
                    </h1>

                    <MDBInput
                      label={otpSent ? "Enter OTP" : "Enter your email"}
                      id="formControlLg"
                      size="lg"
                      style={{ backgroundColor: "white" }}
                      type={otpSent ? "text" : "email"}
                      value={otpSent ? enteredOTP : email}
                      onChange={(e) => otpSent ? setEnteredOTP(e.target.value) : setEmail(e.target.value)}
                      placeholder={otpSent ? "Enter OTP" : "Enter your email"}
                    />

                    {otpSent ? (
                      <MDBBtn onClick={verifyOTP} className="btn wide-btn mt-3">Back to Login</MDBBtn>
                    ) : (
                      <MDBBtn type="submit" className="btn wide-btn mt-3">Get OTP</MDBBtn>
                    )}

                    {verificationError && (
                      <p style={{ paddingTop: "20px", color: "red", fontSize:"25px"}}>{verificationError}</p>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBCardBody>
          </MDBCard>
        </form>
      </div>
    </>
  );
}

export default Forgot;
