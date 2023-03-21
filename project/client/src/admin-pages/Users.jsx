import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

let local = "http://localhost:8080/api/v1/user";
let api =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/user";

function Users() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [users, setUsers] = useState(0);
  const auth = useContext(AuthContext);
  var authBasic = window.btoa(auth.email + ":" + auth.password);
  var config = {
    headers: {
      Authorization: "Basic " + authBasic,
    },
  };

  // Getting the users data
  const getUsers = () => {
    axios.get(local, config).then((res) => {
      setUsers(res.data);
    });
    axios.get(api, config).then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="App">
      <>
        <Container fluid="md">
          <h1 style={{ marginTop: "2%", marginBottom: "2%" }}>Users</h1>
          {/* Users list filter form */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User search</Form.Label>
              <Form.Control type="email" placeholder="Enter Search Terms" />
              <Form.Text className="text-muted">
                Search by user email instead of username
              </Form.Text>
            </Form.Group>
            <Button variant={theme} type="submit">
              Search
            </Button>
          </Form>
          <p> </p>
          {/* Users table data */}
          <Table striped bordered hover bg={theme} variant={theme}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Creation</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <>
                    <tr>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.timestamp}</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </Table>
        </Container>
      </>
    </div>
  );
}

export default Users;
