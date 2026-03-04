import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // ✅ import Link
import "./navbar.css";

const AppNavbar = () => {
  return (
    <Navbar className="navbar" variant="dark" expand={false}>
      <Container fluid className="d-flex align-items-center">
        {/* Centered HOME text */}
        <Navbar.Brand href="/memories" className="mx-auto text-center">
          HOME
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
