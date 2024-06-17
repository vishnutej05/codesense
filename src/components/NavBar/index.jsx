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
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";

  function NavBar(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = Cookies.get("jwtToken") !== undefined;

    useEffect(() => {
      const jwtToken = Cookies.get("jwtToken");
      if (jwtToken === undefined) {
        navigate("/", { replace: true });
      }
    });

    const logOut = () => {
      Cookies.remove("jwtToken");
      navigate("/", { replace: true });
    };

    // console.log("recieving "+props.download);

    function handleDownload() {
      const csvContent =
        "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(props.download);
      const link = document.createElement("a");
      link.setAttribute("href", csvContent);
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
    }

    return (
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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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
                      <br/>
                    </NavDropdown.Item>

                    {location.pathname === "/leaderboard" && (
                        <button className="btn btn-primary ms-3" onClick={handleDownload}>
                          Download CSV
                        </button>
                      )}

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
