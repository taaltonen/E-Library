import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

let local = "http://localhost:8080/api/v1/book";
let api =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/book";

function Books() {
  const auth = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [books, setBooks] = useState();
  const [refresh, setRefresh] = useState(0);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    yr: "",
    genre: "",
    description: "",
  });
  var authBasic = window.btoa(auth.email + ":" + auth.password);
  var config = {
    headers: {
      Authorization: "Basic " + authBasic,
    },
  };

  // Getting books data
  const getBooks = () => {
    axios.get(local).then((res) => {
      setBooks(res.data);
    });
    axios.get(api).then((res) => {
      setBooks(res.data);
    });
  };

  // Adding a book
  const postBook = () => {
    axios.post(local, newBook, config).then((res) => {
      setRefresh(refresh + 1);
    });
    axios.post(api, newBook, config).then((res) => {
      setRefresh(refresh + 1);
    });
  };

  // Deleting a book
  const deleteBook = (bookId) => {
    axios.delete(`${local}${bookId}`, config).then((res) => {
      setRefresh(refresh + 1);
    });
    axios.delete(`${api}${bookId}`, config).then((res) => {
      setRefresh(refresh + 1);
    });
  };

  // Updating book values
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  useEffect(() => {
    getBooks();
  }, [refresh]);
  return (
    <div className="App">
      <>
        <Container fluid="md">
          <h1 style={{ marginTop: "2%", marginBottom: "2%" }}>Books</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Books search</Form.Label>
              <Form.Control type="email" placeholder="Enter Search Terms" />
              <Form.Text className="text-muted">
                Searching instructions/tips here
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          <p> </p>
          {/* Books table data */}
          <Table striped bordered hover bg={theme} variant={theme}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Description</th>
                <th>Loan Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book) => (
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.yr}</td>
                    <td>{book.genre}</td>
                    <td>{book.description}</td>
                    <td>{book.onloan ? "On loan" : "Available"}</td>
                    {/* Book deletion button*/}
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteBook(book.id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              <tr>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleChange}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleChange}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    name="yr"
                    value={newBook.yr}
                    onChange={handleChange}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    name="genre"
                    value={newBook.genre}
                    onChange={handleChange}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={newBook.description}
                    onChange={handleChange}
                  ></input>
                </td>
                {/* Button for adding a book */}
                <td>
                  <Button variant="primary" type="submit" onClick={postBook}>
                    Add book
                  </Button>
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </>
    </div>
  );
}

export default Books;
