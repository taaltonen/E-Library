import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext.js";

let local = "http://localhost:8080/api/v1/book/available";
let local2 = "http://localhost:8080/api/v1/loan/byUser/";
let local3 = "http://localhost:8080/api/v1/loan/";
let local4 = "http://localhost:8080/api/v1/loan/extend/";
let local5 = "http://localhost:8080/api/v1/book/search/";
let api1 =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/book/available";
let api2 =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/loan/byUser/";
let api3 =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/loan/";
let api4 =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/loan/extend/";
let api5 =
  "http://ec2-13-50-112-65.eu-north-1.compute.amazonaws.com:8080/eLibrary-spring-boot/api/v1/book/search/";

function Loans() {
  const auth = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [books, setBooks] = useState("");
  const [loans, setLoans] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [title, setTitle] = useState("");

  var LocalDate = require("@js-joda/core").LocalDate;

  const getAvailBooks = () => {
    axios
      .get(api1)
      .then((res) => {
        setBooks(res.data);
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
    axios
      .get(local)
      .then((res) => {
        setBooks(res.data);
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

  var authBasic = window.btoa(auth.email + ":" + auth.password);
  var config = {
    headers: {
      Authorization: "Basic " + authBasic,
    },
  };

  // Getting users loans data
  const getUsersLoans = () => {
    axios
      .get(`${local2}${auth.userId}`, config)
      .then((res) => {
        setLoans(res.data);
        console.log(res.data);
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
    axios
      .get(`${api2}${auth.userId}`, config)
      .then((res) => {
        setLoans(res.data);
        console.log(res.data);
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

  //Returning loan
  const returnLoan = (loan_id) => {
    axios
      .delete(`${api3}${loan_id}`, config)
      .then((res) => {
        setRefresh(refresh + 1);
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
    axios
      .delete(`${local3}${loan_id}`, config)
      .then((res) => {
        setRefresh(refresh + 1);
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

  //Extending loand
  const extendLoan = (loan_id) => {
    axios
      .put(`${api4}${loan_id}`, config)
      .then((res) => {
        setRefresh(refresh + 1);
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
    axios
      .put(`${local4}${loan_id}`, config)
      .then((res) => {
        setRefresh(refresh + 1);
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

  const getSearchedBook = () => {
    axios
      .get(`${api5}${title}`, config)
      .then((res) => {
        setBooks(res.data);
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
    axios
      .get(`${local5}${title}`, config)
      .then((res) => {
        setBooks(res.data);
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

  const loanBook = (book_id, book_title) => {
    axios
      .post(
        api3,
        { book_id: book_id, user_id: auth.userId, book_title: book_title },
        config
      )
      .then((res) => {
        setRefresh(refresh + 1);
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
    axios
      .post(
        local3,
        {
          book_id: book_id,
          user_id: auth.userId,
          book_title: book_title,
          startDate: LocalDate.now(),
          endDate: LocalDate.now().plusMonths(1),
        },
        config
      )
      .then((res) => {
        setRefresh(refresh + 1);
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

  const test = (book_id, book_title) => {
    console.log("user id is " + auth.userId);
    console.log("book id is = " + book_id);
    console.log("book title is = " + book_title);
  };
  let searchTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  useEffect(() => {
    getAvailBooks();
  }, [refresh]);

  useEffect(() => {
    getUsersLoans();
  }, [refresh]);

  return (
    <div className="App">
      <>
        <Container fluid="md">
          <h1 style={{ marginTop: "2%", marginBottom: "2%" }}>Loans</h1>
          {/* User's current loans table data */}
          <Table striped bordered hover variant={theme}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Renewal</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {loans &&
                loans.map((loan) => (
                  <tr>
                    <td>{loan.book_title}</td>
                    <td>{loan.startDate}</td>
                    <td>{loan.endDate}</td>
                    <td>
                      <Button
                        bg={"success"}
                        variant={"success"}
                        onClick={() => {
                          extendLoan(loan.id);
                        }}
                      >
                        Renew
                      </Button>
                    </td>

                    <td>
                      <Button
                        bg={"success"}
                        variant={"danger"}
                        onClick={() => {
                          returnLoan(loan.id);
                        }}
                        type="submit"
                      >
                        Return
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <h1 style={{ marginTop: "2%", marginBottom: "2%" }}>
            Available books
          </h1>
          {/* Available books search form */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Book search</Form.Label>
              <Form.Control
                placeholder="Enter Search Terms"
                onChange={searchTitle}
              />
              <Form.Text className="text-muted">
                Searching instructions/tips here
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                getSearchedBook();
              }}
            >
              Search
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                getAvailBooks();
              }}
            >
              Available Books
            </Button>
          </Form>
          <p> </p>
          {/* Available loans table data */}
          <Table striped bordered hover variant={theme}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Description</th>
                <th>Loan</th>
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
                    <td>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => {
                          loanBook(book.id, book.title);
                        }}
                      >
                        Loan
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </>
    </div>
  );
}

export default Loans;
