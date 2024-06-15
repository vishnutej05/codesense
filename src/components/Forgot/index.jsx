import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

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
        "https://scoretracking-vishnu.onrender.com/sendotp",
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
          "https://scoretracking-vishnu.onrender.com/getcreds",
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
      console.log("OTP verification successful");
    } else {
      setVerificationError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <form style={{ paddingTop: "100px" }} onSubmit={submitClicked}>
        <h1>Forgot Credentials</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Send OTP</button>
      </form>

      {otpSent && (
        <div style={{ paddingTop: "100px" }}>
          <h2>Enter OTP</h2>
          <input
            type="text"
            value={enteredOTP}
            onChange={(e) => setEnteredOTP(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOTP}>Get Credentials</button>
          {verificationError && (
            <p style={{ paddingTop: "100px" }}>{verificationError}</p>
          )}
          {setOtpSent && <p style={{ paddingTop: "100px" }}>{data}</p>}
        </div>
      )}
    </div>
  );
};

export default Forgot;
