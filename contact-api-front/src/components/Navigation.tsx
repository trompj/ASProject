// Navigation
// Justin Tromp
// Navigation bar at top of page used across application.

import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <div>
                    <Navbar.Brand className="text-light" href="/">
                        Contacts API
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink id="home-link" to="/" href="/"><strong>Dashboard</strong></NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation