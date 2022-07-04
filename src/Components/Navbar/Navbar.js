import React, {Component} from 'react';
import {Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button} from 'react-bootstrap';
import '../../css/navbar.css';
import logo from '../../images/logo.png';
import ProfileNavComp from './ProfileNavComp'

class NavBar extends Component 
{
	render() {
		return (
            <div className="navbar-parent">
                <Navbar expand='lg'>
                    <Navbar.Brand href="/"><h1>Courser</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
 			                <Nav className='mr-auto'>
                            </Nav>
 			            <ProfileNavComp />
                    </Navbar.Collapse>
                </Navbar>
            </div>
		)
	}
}
export default NavBar;