import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import style from './navMenu.module.css'

export default function NavMenu(){
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink activeClassName={style.active} to="/" exact>Home</NavLink>
                <NavLink activeClassName={style.active} style={{marginLeft:15}} to="/about" exact>About us</NavLink>
                <NavLink activeClassName={style.active} style={{marginLeft:15}} to="/contact" exact>Contact</NavLink>
            </Nav>
        </Navbar>
    )
}