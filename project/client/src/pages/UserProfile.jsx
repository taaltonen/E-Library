import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

let local = "http://localhost:8080/api/v1/user/";
let api =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/user/";

export default function UserProfile() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPass, setCurrentPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secondPass, setSecondPass] = useState("");
  var authBasic = window.btoa(auth.email + ":" + auth.password);
  var config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Basic " + authBasic,
    },
  };

  const changePass = () => {
    const obj = {
      userId: auth.userId,
      password: newPassword,
    };

    let match;

    if (currentPass === auth.password && secondPass === newPassword) {
      match = true;
    } else {
      match = false;
    }

    if (match) {
      axios
        .patch(`${local}${auth.userId}`, obj, config)
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
      axios.patch(`${api}${auth.userId}`, obj, config).catch(function (error) {
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
      navigate("/");
      auth.logout();
    }
  };

  const closeAccount = () => {
    axios.delete(`${local}${auth.userId}`, config).catch(function (error) {
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
    axios.delete(`${api}${auth.userId}`, config).catch(function (error) {
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
    navigate("/");
    auth.logout();
  };
  return (
    <Container fluid="md">
      <h1>Profile</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Current password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setCurrentPass(e.target.value)}
          />
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Form.Label>Re-enter new password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setSecondPass(e.target.value)}
          />
          <Form.Text className="text-muted">
            We will never share your password with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              changePass();
            }}
          >
            Change password
          </Button>
        </Form.Group>
        <p></p>
        <Form.Group>
          <Button variant="danger" type="button" onClick={handleShow}>
            Close account
          </Button>
        </Form.Group>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to close your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeAccount}>
            Close account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
