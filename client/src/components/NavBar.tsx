import React from 'react';
import {
    Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADD_BOOK_ROUTE, DASHBOARD_ROUTE } from '../utils/consts';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <NavLink
                    style={{
                        textDecoration: 'none', color: 'grey', fontWeight: 'bold', fontSize: '20px',
                    }}
                    to={ DASHBOARD_ROUTE }
                >
                    Book List
                </NavLink>
                <Nav className="ml-auto">
                    <Button
                        onClick={ () => navigate(DASHBOARD_ROUTE) }
                        variant={ 'outline-secondary' }
                    >
                        Dashboard
                    </Button>
                    <Button
                        onClick={ () => navigate(ADD_BOOK_ROUTE) }
                        variant={ 'outline-secondary' }
                        style={{ marginLeft: 20 }}
                    >
                        Add a Book
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;