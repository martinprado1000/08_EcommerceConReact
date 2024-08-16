import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; //IMPORTAMOS el hook del formulario
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GiElephantHead } from "react-icons/gi";
import { BsCart3 } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useUsersContext } from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ModalInitSesion = ({ show, handleClose }) => {
  const { login, getTotalAmount } = useUsersContext();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors }, // Son los valores del objeto error
    watch, // Guarda el valor actual de los inputps
    handleSubmit,
    reset, // resetea TODO el formulario cuando lo llamo
    resetField, // restea el input seleccionado, ej: setValue("password")
    setValue, // Le asigna el valor que le asignemos a un input, ej: setValue("email","")
  } = useForm({
    defaultValues: {
    },
  });

  const loginUser = async (user) => {
    try {
      const res = await login(user);
      if (res.status === 200) {
        handleClose();
        return;
      }
      if (res.status === 401) {
        Swal.fire({
          title: res.data,
          icon: "warning", // succes , warning , info , question, error
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      } else {
        Swal.fire({
          title: res.data,
          icon: "error", // succes , warning , info , question, error
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(loginUser)}>
        <Modal.Body>
          <Form.Group md="6">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                type="text" //Lo hago tipo text para no levante el error email de html
                placeholder="Ingrese su email"
                aria-describedby="inputGroupPrepend"
                {...register("email", {
                  required: {
                    value: true,
                    message: "La campo email es requerido",
                  },
                  pattern: {
                    // pattern es para validar expresiones regulares
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Email inválido",
                  },
                })}
              />
            </InputGroup>
            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </Form.Group>

          <Form.Group md="3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              className="mb-2"
              type="password"
              placeholder="Ingrese una contraseña"
              {...register("password", {
                required: {
                  value: true,
                  message: "La campo contraseña es requerido",
                },
                minLength: {
                  value: 6,
                  message: "El campo contraseña debe tener mas de 6 caracteres",
                },
                maxLength: {
                  value: 20,
                  message:
                    "El campo contraseña debe tener menos de 20 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-danger mt-1">{errors.password.message}</p>
            )}
          </Form.Group>

          <Link className="ms-1" to="/register">
            Regístrate
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit">
            Iniciar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

function NavbarLogIn() {
  const location = useLocation();
  const currentLocation = location.pathname;

  const { isLogged, userLogged, handleLogin, totalAmount, getTotalAmount } = useUsersContext();

  useEffect(() => {
    getTotalAmount(userLogged.idCart)
  }, [totalAmount]);

  // Estado del modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <Navbar expand="sm" bg="dark" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <GiElephantHead style={{ fontSize: "2rem" }} />
          <Navbar.Brand className="d-sm-none ms-2">Ecommerce</Navbar.Brand>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-sm-0 w-100" navbarScroll>
            <Nav.Link as={NavLink} to={"/"}>
              Products
            </Nav.Link>
            <NavDropdown title="Categoría" id="navbarScrollingDropdown">
              <NavDropdown.Item as={NavLink} to={"/category/cellphone"}>
                Celulares
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/category/notebook"}>
                Notebooks
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/category/tablet"}>
                Tablets
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {currentLocation !== "/register" ? (
            <>
              {isLogged ? (
                <Nav className="ms-auto w-100 d-flex justify-content-sm-end">
                  <Nav.Link className="position-relative d-none d-sm-block me-3" as={NavLink} to={"/cart"}>
                    <BsCart3 />
                    {totalAmount > 0 && (
                      <Badge
                        pillcart
                        bg="primary"
                        className="position-absolute top-1 start-100 translate-middle"
                      >
                        {totalAmount}
                      </Badge>
                    )}
                  </Nav.Link>
                  <NavDropdown
                    align={{ xs: "start" }}
                    title={userLogged.email}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item as={Link} to={"/cart"}>
                      Mi carrito
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogin(false)}>
                      Cerrar sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav className="ms-auto w-100 d-flex justify-content-sm-end">
                  <Nav.Link onClick={() => setShow(true)}>
                    Iniciar sesión
                  </Nav.Link>
                </Nav>
              )}
            </>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>

      {/* Bootstrap Modal */}
      <ModalInitSesion show={show} handleClose={handleClose}/>
    </Navbar>
  );
}

export default NavbarLogIn;
