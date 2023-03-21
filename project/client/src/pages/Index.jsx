import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

let local = "http://localhost:8080/api/v1/auth";
let api =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/auth";

function Index() {
  const { theme, setTheme } = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios
      .post(
        api,
        { username: email, password: password },
        { "Content-Type": "application/json" }
      )
      .then((res) => {
        auth.login(password, res.data.email, res.data.role, res.data.id);
        navigate("/loans");
      })
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
    const response2 = await axios
      .post(
        local,
        { username: email, password: password },
        { "Content-Type": "application/json" }
      )
      .then((response2) => {
        auth.login(
          password,
          response2.data.email,
          response2.data.role,
          response2.data.id
        );
        navigate("/loans");
      })
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

  return (
    <div className="App">
      <>
        <Container fluid="md">
          <h1 style={{ marginTop: "2%", marginBottom: "2%" }}>Login</h1>
          <Form>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              bg={theme}
              variant={theme}
              type="submit"
              onClick={onSubmitHandler}
            >
              Login
            </Button>
            <Form.Text className="text"> </Form.Text>
            <Form.Text className="text">No login credentials? </Form.Text>
            <Link to="/register">Register now</Link>
          </Form>
        </Container>
      </>
    </div>
  );
}

export default Index;
