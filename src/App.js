// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { FaHome, FaSearch, FaPlus, FaBell, FaCog } from 'react-icons/fa'; // Iconos

// Importa los nuevos componentes
import UserForm from './componentes/UserForm';
import UserList from './componentes/UserList';

function Finanzauto() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('finanzauto_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Guardar usuarios en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('finanzauto_users', JSON.stringify(users));
  }, [users]);

  // Función para añadir un nuevo usuario
  const addUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  // Función para actualizar un usuario existente
  const updateUser = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // Función para eliminar un usuario
  const deleteUser = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  return (
    <Router>
      <div>
        <header className="contenedor-Finanzauto">
          {/* LOGO ARRIBA */}
          <div className='logo-barra'>
            <Link to="/"> {/* Enlace al inicio desde el logo */}
              <img
                className='imagen-finanzauto'
                src={require('./imagen/finanzauto.jpg')}
                alt='Foto de Finanzauto'
              />
            </Link>
          </div>

          {/* MENÚ DE NAVEGACIÓN WEB */}
          <nav className='main-nav'>
            <ul className='menu-web'>
              <li><Link to="/"><FaHome /> Inicio</Link></li>
              <li><Link to="/buscar"><FaSearch /> Buscar</Link></li> {/* Puedes crear un componente de búsqueda */}
              <li>
                <Link to="/crear" className="boton-central-web"> {/* ENLACE A LA PÁGINA DE CREAR */}
                  <FaPlus />
                </Link>
              </li>
              <li><Link to="/notificaciones"><FaBell /> Notificaciones</Link></li> {/* Rutas futuras */}
              <li><Link to="/configuracion"><FaCog /> Configuración</Link></li> {/* Rutas futuras */}
            </ul>
          </nav>
        </header>

        {/* CONTENIDO PRINCIPAL: Rutas de la aplicación */}
        <main className='contenido-principal'> {/* Cambié a 'contenido-principal' para evitar conflicto con la clase 'contenido' interna */}
          <Routes>
            <Route path="/" element={<UserList users={users} deleteUser={deleteUser} />} />
            <Route
              path="/crear"
              element={<UserForm addUser={addUser} />}
            />
            <Route
              path="/edit/:id"
              element={<UserForm users={users} updateUser={updateUser} />}
            />
            {/* Puedes añadir rutas para /buscar, /notificaciones, /configuracion */}
            <Route path="/buscar" element={<div>Página de Búsqueda (próximamente)</div>} />
            <Route path="/notificaciones" element={<div>Página de Notificaciones (próximamente)</div>} />
            <Route path="/configuracion" element={<div>Página de Configuración (próximamente)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default Finanzauto;