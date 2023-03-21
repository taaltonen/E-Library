import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";

let local = "http://localhost:8080/api/v1/register";
let api =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/register";

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios
      .post(
        api,
        { username: username, password: password, email: email },
        { "Content-Type": "application/json" }
      )
      .then((res) => navigate("/"))
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(response.username + " " + response.password);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Unknown Error", error.message);
        }
        console.log(error.config);
      });
    const response2 = await axios
      .post(
        local,
        { username: username, password: password, email: email },
        { "Content-Type": "application/json" }
      )
      .then((response2) => navigate("/"))
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Unknown Error", error.message);
        }
        console.log(error.config);
      });
  };
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="App">
      <Container fluid="md">
        <h1 style={{ marginTop: "2%", marginBottom: "2%" }}>Register</h1>
        <Form>
          {/* Email registration field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {/* Username registration field */}
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          {/* Password registration field which uses preset controlid to hide input value */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {/* Register button */}
          <Button
            bg={theme}
            variant={theme}
            type="submit"
            onClick={onSubmitHandler}
          >
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
