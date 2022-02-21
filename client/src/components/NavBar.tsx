import React from 'react';
import {
    Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADD_BOOK_ROUTE, DASHBOARD_ROUTE } from '../utils/consts';

const NavBar = (): React.ReactElement => {
    const navigate = useNavigate();

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <NavLink
                    className='nav-link'
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
                        className='ml-20'
                        onClick={ () => navigate(ADD_BOOK_ROUTE) }
                        variant={ 'outline-secondary' }
                    >
                        Add a Book
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
