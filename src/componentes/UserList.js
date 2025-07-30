// src/components/UserList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css'; // Crea este archivo CSS para los estilos de la lista
import { FaEdit, FaTrash } from 'react-icons/fa';

function UserList({ users, deleteUser }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navega a la ruta de edición
  };

  return (
    <div className="user-list-container">
      <h2>Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados aún. ¡Crea uno!</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.correo}</td>
                <td className="actions-cell">
                  <button onClick={() => handleEdit(user.id)} className="edit-button">
                    <FaEdit /> Editar
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="delete-button">
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;