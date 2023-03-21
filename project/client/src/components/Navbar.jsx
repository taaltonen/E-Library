import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ThemeContext } from "../context/ThemeContext.js";
import Container from "react-bootstrap/esm/Container.js";
import Button from "react-bootstrap/esm/Button.js";
import Nav from "react-bootstrap/Nav";
import Clock from "../Clock.js";
import { AuthContext } from "../context/AuthContext.js";

export default function NavigationBar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const auth = useContext(AuthContext); //Linking our AuthContext from app
  return (
    <Navbar collapseOnSelect expand="lg" bg={theme} variant={theme}>
      <Container fluid="md">
        <Navbar.Brand>Library App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={"/"}>
            {!auth.isLoggedIn && (
              <Nav.Item>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
            )}
            {/* If user is not logged in, register won't show up as a nav link */}
            {!auth.isLoggedIn && (
              <Nav.Item>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </Nav.Item>
            )}
            {/* If user has the role admin, books page will be displayed as a navlink */}
            {auth.role === "ADMIN" && auth.isLoggedIn && (
              <Nav.Item>
                <Nav.Link as={NavLink} to="/books">
                  Books
                </Nav.Link>
              </Nav.Item>
            )}
            {/* If user has the role admin, users page will be displayed as a navlink */}
            {auth.role === "ADMIN" && auth.isLoggedIn && (
              <Nav.Item>
                <Nav.Link as={NavLink} to="/users">
                  Users
                </Nav.Link>
              </Nav.Item>
            )}
            {/* If any user is logged in, loans page will be displayed as a navlink */}
            {auth.isLoggedIn && (
              <Nav.Item>
                <Nav.Link as={NavLink} to="/loans">
                  Loans
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          {/* Navdropdown used for setting themes & saves the selection using themecontext */}
          <Nav className="me-auto">
            <NavDropdown title="Theme" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setTheme("primary")}>
                Blue
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("dark")}>
                Dark
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("light")}>
                Light
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("success")}>
                Green
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("warning")}>
                Yellow
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {/* Navbar.Text lacks padding so let's add it manually */}
            <Navbar.Text style={{ padding: "3px" }} id="status">
              {auth.isLoggedIn ? "Logged in" : "Not logged in"}
            </Navbar.Text>
            {/* Gets current date from Clock.js as Navbar.Text*/}
            <Clock></Clock>
          </Nav>
          {/* Checks auth login for displaying profile navigation link*/}
          {auth.isLoggedIn && (
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/profile"
                style={{ padding: "3px", color: "blue" }}
              >
                Profile
              </Nav.Link>
            </Nav.Item>
          )}
          {/* Checks authorized login for displaying the logout button */}
          {auth.isLoggedIn && (
            <Nav>
              <Button
                style={{ padding: "5px" }}
                variant="danger"
                onClick={() => {
                  auth.logout();
                  navigate("/");
                }}
              >
                Log out
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
