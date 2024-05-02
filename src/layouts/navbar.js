import {Container, Nav, Navbar} from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const NavbarExample = () => {
    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Hospital El Alerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/paciente/nuevo">Agregar paciente</Nav.Link>        
                    <Nav.Link as={Link} to="/paciente/listar">Listar Todos</Nav.Link>                    
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <section>
                <Outlet>

                </Outlet>
            </section>
        </>
    );
}

export default NavbarExample;