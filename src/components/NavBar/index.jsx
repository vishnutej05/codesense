  /* eslint-disable react/prop-types */
  import { Navbar, Container, Nav, Image } from "react-bootstrap";
  import { NavDropdown } from "react-bootstrap";
  import { FaUser } from "react-icons/fa";
  import { MdLeaderboard } from "react-icons/md";
  import { IoBookOutline } from "react-icons/io5";
  import { MdWork } from "react-icons/md";
  import "./styles.scss";
  import { Link, useLocation } from "react-router-dom";
  import Cookies from "js-cookie";
  import { FaLaptopCode } from "react-icons/fa6";
  // import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";

import './index.css'

  function NavBar(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = Cookies.get("jwtToken") !== undefined;

    const logOut = () => {
      Cookies.remove("jwtToken");
      navigate("/", { replace: true });
    };

    return (
      <>

        {location.pathname === "/" || location.pathname === "/forgot" && (
            <div className="bg-container shadow ps-4 pe-4 p-2">  
              <img src = "/assets/Logo.png" className="logo"/>
              <img src = "/assets/MLRIT.png" alt = "MLRIT" className="logo text-center"/>
              {/* <h1 className="pt-2">Contact Us</h1> */}
            </div>
         )}    

        {isLoggedIn && (
        <>
        <Navbar
          className="bg-purple sticky"
          variant="dark"
          expand="lg"
          // fixed="top"
        >
          <Container fluid>
            
          
            <Navbar.Brand as={Link} to="/leaderboard">
              Code Sense
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" /><Navbar.Collapse id="basic-navbar-nav">
                <Nav
                  className="ms-auto me-auto"
                  style={{ gap: "7vw", fontSize: "1.1rem" }}
                >
                  <Nav.Link as={Link} to="/leaderboard" className="text-white">
                    <div style={{ textAlign: "center" }}>
                      <MdLeaderboard />
                      <br />
                      <div>Leaderboard</div>
                    </div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/courses" className="text-white">
                    <div style={{ textAlign: "center" }}>
                      <IoBookOutline />
                      <br />
                      <div>Courses</div>
                    </div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/jobs" className="text-white">
                    <div style={{ textAlign: "center" }}>
                      <MdWork />
                      <br />
                      <div>Jobs</div>
                    </div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contests" className="text-white">
                    <div style={{ textAlign: "center" }}>
                      <FaLaptopCode />
                      <br />
                      <div>Contests</div>
                    </div>
                  </Nav.Link>
                </Nav>
                {/* {isLoggedIn && ( */}
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={<FaUser />}
                    menuVariant="dark"
                    align="end"
                  >
                    <NavDropdown.Item as={Link} to="/profile">
                      <Image
                        roundedCircle
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }} />
                      My Profile
                      <br />
                    </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/" onClick={logOut}>
                        LogOut
                      </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
      )}
      </>
    );
  }

  export default NavBar;
