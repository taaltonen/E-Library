import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

// This function gets the current date and returns it to the navbar.jsx in components folder
function Clock() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return (
    <Navbar.Text style={{ padding: "3px" }} id="date">
      {today}
    </Navbar.Text>
  );
}

export default Clock;
