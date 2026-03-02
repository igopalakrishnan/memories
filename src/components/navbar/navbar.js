import React, { useState, useEffect, Suspense } from "react";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import "./navbar.css";

// Lazy load the profile list component
const ProfileList = React.lazy(() => import("./ProfileList"));

const AppNavbar = () => {
  const [show, setShow] = useState(false);
  const [loadContent, setLoadContent] = useState(false);

  const handleClose = () => {
    setShow(false);
    setLoadContent(false);
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
              <Suspense fallback={<div>Loading profiles...</div>}>
                <ProfileList onClose={handleClose} />
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
