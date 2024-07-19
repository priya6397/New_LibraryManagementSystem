import React from 'react';
import { Link, NavLink } from "react-router-dom";

import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaHome } from 'react-icons/fa';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
 
const NavBar = () => {
  return (
   
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          {/* <LibraryBooksIcon style={{ color: 'aliceblue' }} /> */}
          LIBRARY MANAGEMENT SYSTEM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} exact to="/">
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/About">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Contact">
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/AddCity">
              Add City
            </Nav.Link>
            <Nav.Link as={NavLink} to="/AddLibrary">
              Add Library
            </Nav.Link>
            <Nav.Link as={NavLink} to="/AddBooks">
              Add Book
            </Nav.Link>
            <Nav.Link as={NavLink} to="/AddUser">
              Add User
            </Nav.Link>
          </Nav>
          <Nav style={{marginRight:90}}>
            <MenuBookOutlinedIcon style={{ color: 'aliceblue' }} />
            <NavDropdown title="MENU" id="dropdown-basic-button">
              <NavDropdown.Item as={NavLink} to="/City">
                City List
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Library">
                Library List
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Books">
                Books List
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Users">
                Users List
              </NavDropdown.Item>
              {/* <NavDropdown.Item as={NavLink} to="/SearchUsers">
                Search Users List
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
 
export default NavBar
 