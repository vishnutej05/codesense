/* eslint-disable react/prop-types */
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaLaptopCode } from "react-icons/fa6";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Cookies.get("jwtToken") !== undefined;

  const logOut = () => {
    Cookies.remove("jwtToken");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Navbar
        className="bg-purple sticky"
        variant="dark"
        expand="lg"
        // fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/leaderboard">
            MLR Coding
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto me-auto"
              style={{ gap: "5vw", fontSize: "1.1rem" }}
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
            {isLoggedIn && (
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={<FaUser />}
                  menuVariant="light"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    <Image
                      roundedCircle
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                    />
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/action">
                    Action
                  </NavDropdown.Item>
                  {location.pathname !== "/" && (
                    <NavDropdown.Item as={Link} to="/" onClick={logOut}>
                      LogOut
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
