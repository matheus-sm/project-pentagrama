import React from "react"
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/esm/Container"
import './Styles/Navbar.css'

function Nav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="NavbarContainer">
        <ul className="MenuContainer">
          <li>
            <Link className="MainPage" to="/?">Início</Link>
          </li>
          <li>
            <Link className="PageSecondary" to="/cities">Cadastro de cidades</Link>
          </li>
          <li>
            <Link className="PageSecondary" to="/district">Cadastro de bairros</Link>
          </li>
          <li>
            <Link className="PageSecondary" to="/report">Relatorio</Link>
          </li>
        </ul>
        <ul className="MenuAsideContainer">
          <li>
            <Link className="PageSecondary" to="/user">Criar conta</Link>
          </li>
        </ul>
      </Container>
    </Navbar>
  );
}

export default Nav;