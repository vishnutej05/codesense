import { useState } from "react";
import Cookies from "js-cookie";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile,
  MDBCardImage,
  MDBRadio,
} from "mdb-react-ui-kit";
import { CiLink } from "react-icons/ci";
import api from "../../api/axiosConfig";

function Personal() {
  const jwtToken = Cookies.get("jwtToken");
  const [formData, setFormData] = useState({
    about_me: "",
    gender: "",
    dob: "",
    building: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    fb_handle: "",
    twitter_handle: "",
    github: "",
    linkedin_handle: "",
    insta_handle: "",
    name: "",
    user_name: "",
    profile: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const [selectedCV, setSelectedCV] = useState(null);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [uploadingCertifications, setUploadingCertifications] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handleCVChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = /(\.pdf)$/i;

    if (!allowedExtensions.test(selectedFile.name)) {
      console.error("Invalid file type. Please select a PDF file.");
      return;
    }

    setSelectedCV(selectedFile);
  };

  const handleCertificationsChange = (e) => {
    const selectedFiles = e.target.files;
    const allowedExtensions = /(\.pdf)$/i;

    for (let i = 0; i < selectedFiles.length; i++) {
      if (!allowedExtensions.test(selectedFiles[i].name)) {
        console.error("Invalid file type. Please select only PDF files.");
        return;
      }
    }

    setSelectedCertifications(selectedFiles);
  };

  const handlePhotoChange = (e) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const fileName = e.target.files[0].name;

    if (!allowedExtensions.test(fileName)) {
      console.error(
        "Invalid file type. Please select a file with .jpg, .jpeg, or .png extension."
      );
      return;
    }

    setSelectedPhoto(e.target.files[0]);
  };

  const handleCVUpload = async () => {
    if (!selectedCV) {
      console.error("No CV file selected");
      return;
    }

    try {
      setUploadingCV(true);
      const formData = new FormData();
      formData.append("file", selectedCV);

      const response = await api.post("/uresume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${jwtToken}`,
        },
      });


      if (response.status === 200) {
        console.log("CV uploaded successfully");
        // Optionally, you can update state or show a success message
      } else {
        console.error("Failed to upload CV");
        // Optionally, you can show an error message to the user
      }
    } catch (error) {
      console.log(selectedCV);
      console.error("Error occurred while uploading CV:", error);
      // Optionally, you can show an error message to the user
    } finally {
      setUploadingCV(false);
    }
  };

  const handleCertificationsUpload = async () => {
    if (selectedCertifications.length === 0) {
      console.error("No certification files selected");
      return;
    }

    try {
      setUploadingCertifications(true);
      const formData = new FormData();
      selectedCertifications.forEach((selectedCertifications) => {
        formData.append("certifications", selectedCertifications);
      });

      const response = await api.post("/upload-certifications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Certifications uploaded successfully");
        // Optionally, you can update state or show a success message
      } else {
        console.error("Failed to upload certifications");
        // Optionally, you can show an error message to the user
      }
    } catch (error) {
      console.log(selectedCertifications);
      console.error("Error occurred while uploading certifications:", error);
      // Optionally, you can show an error message to the user
    } finally {
      setUploadingCertifications(false);
    }
  };
  const handlePhotoUpload = async () => {
    if (!selectedPhoto) {
      console.error("No photo selected");
      return;
    }

    try {
      setUploadingPhoto(true);
      const formData = new FormData();
      formData.append("file", selectedPhoto);

      const response = await api.post("/uimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        console.log("Photo uploaded successfully");
        // Optionally, you can update state or show a success message
      } else {
        console.error("Failed to upload photo");
        // Optionally, you can show an error message to the user
      }
    } catch (error) {
      console.log(selectedPhoto);
      console.error("Error occurred while uploading photo:", error);
      // Optionally, you can show an error message to the user
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(formData),
    };

    console.log(options.body);

    try {
      const response = await fetch(
        "https://scoretracking-vishnu.onrender.com/udetails",
        options
      );

      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error occurred while submitting data:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5E1FF" }}>
      <MDBContainer fluid>
        <MDBRow className="d-flex my-5">
          <MDBCol lg="5" className="my-5">
            <MDBCard
              className="my-20"
              style={{
                borderRadius: "1.2rem",
                boxShadow: "0px 0px 10px 1px rgba(255, 255, 0, 0.7)",
              }}
            >
              <MDBCardBody className="px-4">
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                    </MDBCardBody>
                  </MDBCard>

                  <MDBFile
                    id="customFile"
                    onChange={handlePhotoChange}
                    accept=".jpg, .jpeg, .png"
                  />
                  <div className="small text-muted mt-2">
                    Upload in jpg/jpeg/png format
                  </div>
                </MDBRow>
                <MDBBtn
                  className="my-4"
                  onClick={handlePhotoUpload}
                  disabled={uploadingPhoto}
                >
                  Upload Image
                </MDBBtn>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3">
                    <h6 className="mb-0">Email address</h6>
                  </MDBCol>

                  <MDBCol md="7">
                    <MDBInput
                      label="example@example.com"
                      size="lg"
                      id="form1"
                      type="email"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="pe-5">
                    <MDBBtn className="my-4">Update</MDBBtn>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center pt-0 pb-0">
                  <MDBCol md="3"></MDBCol>
                  <MDBCol md="6">
                    <p>*OTP verification needed on update</p>
                  </MDBCol>
                  <MDBCol md="2"></MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3">
                    <h6 className="mb-0">Mobile</h6>
                  </MDBCol>

                  <MDBCol md="7">
                    <MDBInput
                      label="Mobile"
                      size="lg"
                      id="form1"
                      type="number"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="pe-5">
                    <MDBBtn className="my-4">Update</MDBBtn>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center pt-0 pb-0">
                  <MDBCol md="3"></MDBCol>
                  <MDBCol md="6">
                    <p>*OTP verification needed on update</p>
                  </MDBCol>
                  <MDBCol md="2"></MDBCol>
                </MDBRow>
                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3">
                    <h6 className="mb-0">Upload CV</h6>
                  </MDBCol>

                  <MDBCol md="9">
                    <MDBFile
                      id="customFile"
                      onChange={handleCVChange}
                      accept=".pdf"
                    />
                    <span className="small text-muted mt-2 me-1">
                      Upload in pdf format only. Max file size 5 MB
                    </span>
                    <MDBBtn
                      className="my-3 ms-3"
                      onClick={handleCVUpload}
                      disabled={uploadingCV}
                    >
                      Upload
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3">
                    <h6 className="mb-0">Upload Certifications</h6>
                  </MDBCol>
                  <MDBCol md="9">
                    <MDBFile
                      multiple
                      id="customFile"
                      onChange={handleCertificationsChange}
                      accept=".pdf"
                    />
                    <span className="small text-muted mt-2 me-1">
                      Upload in pdf format only. Max file size 5 MB
                    </span>
                    <MDBBtn
                      className="my-3 ms-3"
                      onClick={handleCertificationsUpload}
                      disabled={uploadingCertifications}
                    >
                      Upload
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="7" className="my-5">
            <MDBCard
              style={{
                borderRadius: "1.2rem",
                boxShadow: "0px 0px 10px 1px rgba(255, 255, 0, 0.7)",
              }}
            >
              <MDBCardBody className="px-4">
                <MDBRow className="d-flex justify-content-center align-items-center">
                  <h4 className="mb-4 text-center">BASIC INFORMATION</h4>
                </MDBRow>

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Username</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="user_name"
                      onChange={handleInputChange}
                      size="lg"
                      id="user_name"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Full name</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="name"
                      onChange={handleInputChange}
                      size="lg"
                      id="name"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">About Me</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Message"
                      onChange={handleInputChange}
                      size="lg"
                      id="about_me"
                      rows={3}
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Gender:</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <div className="d-md-flex ustify-content-start align-items-center ">
                      <MDBRadio
                        name="inlineRadio"
                        onChange={handleInputChange}
                        id="gender"
                        value="female"
                        label="Female"
                        inline
                      />
                      <MDBRadio
                        name="inlineRadio"
                        onChange={handleInputChange}
                        id="gender"
                        value="male"
                        label="Male"
                        inline
                      />
                      <MDBRadio
                        name="inlineRadio"
                        onChange={handleInputChange}
                        id="gender"
                        value="other"
                        label="Other"
                        inline
                      />
                    </div>
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Date of Birth</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Date"
                      size="lg"
                      onChange={handleInputChange}
                      id="dob"
                      type="date"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="d-flex justify-content-center align-items-center">
                  <h4 className="mb-4 text-center">Address</h4>
                </MDBRow>

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Building</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Building"
                      size="lg"
                      onChange={handleInputChange}
                      id="building"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>
                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Street</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Street"
                      size="lg"
                      onChange={handleInputChange}
                      id="street"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>
                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">City</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="City"
                      size="lg"
                      onChange={handleInputChange}
                      id="city"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>
                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">State</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="State"
                      size="lg"
                      id="state"
                      onChange={handleInputChange}
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className="align-items-center pt-1 pb-2">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Postal Code</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Postal Code"
                      size="lg"
                      id="postal_code"
                      onChange={handleInputChange}
                      type="number"
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="justify-content-center align-items-center m-5">
                  <MDBCard>
                    <MDBCardBody className="px-4">
                      <h4 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                        Social and Professional Profiles
                      </h4>

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass=""
                            label="Github"
                            size="lg"
                            id="github"
                            onChange={handleInputChange}
                            type="url"
                          />
                          <p className="form-helper">Example : www.linked.in</p>
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass=""
                            icon={CiLink}
                            label="linkedin_handle"
                            size="lg"
                            onChange={handleInputChange}
                            id="linkedin_handle"
                            type="url"
                          />
                          <p className="form-helper">Example : www.linked.in</p>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass=""
                            label="X"
                            size="lg"
                            id="x"
                            onChange={handleInputChange}
                            type="text"
                          />
                          <p className="form-helper">Example : www.linked.in</p>
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass=""
                            label="insta_handle"
                            size="lg"
                            id="insta_handle"
                            onChange={handleInputChange}
                            type="text"
                          />
                          <p className="form-helper">Example : www.linked.in</p>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBRow>
                <hr className="mx-n3" />
                <MDBBtn className="my-4" size="lg" onClick={handleSubmit}>
                  Update Details
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Personal;
