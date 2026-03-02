import React, { useState, useEffect, Suspense } from "react";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css";

// Lazy load the profile lists
const BirthdayList = React.lazy(() => import("./BirthdayList"));
const OtherList = React.lazy(() => import("./OtherList"));

const AppNavbar = () => {
  const [show, setShow] = useState(false);
  const [loadContent, setLoadContent] = useState(false);

  const handleClose = () => {
    setShow(false);
    setLoadContent(false); // reset when closed
  };
  const handleShow = () => {
    setShow(true);
    // trigger async content load after shell opens
    setTimeout(() => setLoadContent(true), 50);
  };

  return (
    <Navbar className="navbar" bg="dark" variant="dark" expand={false}>
      <Container fluid>
        <Navbar.Brand href="/memories">
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
            {loadContent ? (
              <Suspense fallback={<div>Loading lists...</div>}>
                <h5 className="mt-2 mb-3">Birthday's Memories</h5>
                <BirthdayList onClose={handleClose} />

                <h5 className="mt-5 mb-3">Other's Memories</h5>
                <OtherList onClose={handleClose} />
              </Suspense>
            ) : (
              <div>Preparing content...</div>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
