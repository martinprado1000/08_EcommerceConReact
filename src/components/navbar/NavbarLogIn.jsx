import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GiElephantHead } from "react-icons/gi";
import { BsCart3 } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import {
  Link,
  NavLink,
} from "react-router-dom";

function NavbarLogIn() {
  const [isLogged, setIsLogged] = useState(true);
  const [cartCount, setCartCount] = useState(1); 

  return (
    <Navbar expand="sm" bg="dark" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <GiElephantHead style={{ fontSize: "2rem" }}/>
          <Navbar.Brand className="d-sm-none ms-2">Ecommerce</Navbar.Brand>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-sm-0 w-100" navbarScroll>
            <Nav.Link as={NavLink} to={"/"}>Products</Nav.Link>
            <NavDropdown title="Categoría" id="navbarScrollingDropdown">
              <NavDropdown.Item as={NavLink} to={"/category/celular"}>Celulares</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/category/notebook"}>Notebooks</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/category/tablet"}>Tablets</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {isLogged ? (
            <Nav className="ms-auto w-100 d-flex justify-content-sm-end">
              <Nav.Link className="position-relative d-none d-sm-block me-3">
                <BsCart3 />
                {cartCount > 0 && (
                  <Badge
                    pill
                    bg="primary"
                    className="position-absolute top-1 start-100 translate-middle"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
              <NavDropdown
                title="Nombre de usuario"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item as={Link} to={"/perfil"}>Perfil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/carrito"}>Mi carrito</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ms-auto w-100 d-flex justify-content-sm-end">
              <Nav.Link href="#login">Iniciar sesión</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLogIn;
