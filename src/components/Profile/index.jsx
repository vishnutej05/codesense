/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import DashBoard from "../DashBoard";
import HeatMap from "../HeatMap";
import NavBar from "../NavBar/";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";
import api from "../../api/axiosConfig";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard", {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xsX25vIjoiMjFyMjFhNjYxNCIsImlhdCI6MTcxMjUxMDU5NH0.Jpch2FREAiCEd4ru19lLHb279oJRRo2hqU5CNYUVWAo",
          },
        });

        if (response.status === 200) {
          setDashboardData(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch dashboard details");
        }
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  console.log(dashboardData);
  return (
    <>
      <NavBar />
      <section style={{ backgroundColor: "#eee", paddingTop: "50px" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
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

              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>

                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {" "}
                        Vishnu E Tej
                        {dashboardData && dashboardData.user_name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        evishnutej@gmail.com
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        (097) 234-5678
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        7674972704
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        Bolarum, Secunderabad
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="globe fa-lg text-warning" />
                      <MDBCardText>https://mdbootstrap.com</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                      <MDBCardText>@mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="facebook fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBRow className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <div>Coding Analysis:</div>
                    <DashBoard stats={null} />
                  </MDBCardBody>
                </MDBCard>
              </MDBRow>
              <MDBRow>
                <MDBCard
                  className="mb-4 mb-md-0"
                  style={{ paddingTop: "2rem", paddingLeft: 0 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "end",
                    }}
                  >
                    <div>Total Active Days: 4</div>
                    <div>Max Streak : 2</div>
                  </div>
                  <HeatMap style={{ width: "10rem" }} />
                </MDBCard>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
