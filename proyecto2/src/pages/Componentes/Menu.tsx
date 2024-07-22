import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Menu = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link" href="./RegistrarUser">Registrar Nuevo Usuario</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="./RegistrarPet">Registrar Mascota</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="./Visualizar">Visualizar lo Registrado</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/">Salir</a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Menu;
