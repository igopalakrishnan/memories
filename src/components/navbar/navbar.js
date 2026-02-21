import React, { useState } from "react";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { birthday, other } from "../home/profiles";

const AppNavbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" variant="dark" expand={false}>
      <Container fluid>
        <Navbar.Brand href="/">
          <i className="bi bi-house-door-fill"></i> HOME
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
          className="offcanvas-dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel" className="mt-2">
              Memories
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Offcanvas.Title id="offcanvasNavbarLabel"  className="mt-2 mb-3">
              Birthday's Memories
            </Offcanvas.Title>
            <Nav className="flex-column">
              {birthday.map((p, index) => (
                <NavLink
                  key={index}
                  to={p.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={handleClose}
                >
                  <div className="profile-item">
                    <span className="profile-name">{p.name}</span>
                    <span className="profile-dob">{p.dob}</span>
                  </div>
                </NavLink>
              ))}
            </Nav>

            <Offcanvas.Title id="offcanvasNavbarLabel" className="mt-5 mb-3">
              Other's Memories
            </Offcanvas.Title>
            <Nav className="flex-column">
              {other.map((p, index) => (
                <NavLink
                  key={index}
                  to={p.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={handleClose}
                >
                  <div className="profile-item">
                    <span className="profile-name">{p.name}</span>
                    <span className="profile-dob">{p.dob}</span>
                  </div>
                </NavLink>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
