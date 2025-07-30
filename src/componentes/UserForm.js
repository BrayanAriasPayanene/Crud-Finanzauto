// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; /*useState para manejar el estado local del formulario.*/ /*useEffect para ejecutar lógica cuando cambia el id o los users.*/
import './UserForm.css'; // Crea este archivo CSS para los estilos del formulario
import { FaKey, FaBook, FaUser, FaVenusMars, FaEnvelope, FaCalendarAlt, FaPhone, FaCheck } from 'react-icons/fa';

function UserForm({ addUser, users, updateUser }) {
  const navigate = useNavigate(); /*Permite redirigir al usuario a otra ruta (por ejemplo, volver al inicio después de guardar).*/
  const { id } = useParams(); // Para obtener el ID si estamos editando
  const [formData, setFormData] = useState({ /*Define el estado del formulario (formData) con campos iniciales vacíos.*/
    id: '',
    titulo: '',
    nombres: '',
    apellidos: '',
    genero: '',
    correo: '',
    fechaNacimiento: '',
    telefono: ''
  });

  useEffect(() => { /*Si hay un id en la URL y existe la lista users, busca el usuario correspondiente y carga sus datos en el formulario (setFormData).*/
    if (id && users) {
      const userToEdit = users.find(user => user.id === id);
      if (userToEdit) {
        setFormData(userToEdit);
      }
    }
  }, [id, users]);

  const handleChange = (e) => { /*Cada vez que se escribe algo en un campo del formulario, esta función actualiza el estado (formData) según el name del input.*/
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    if (id) {
      updateUser(formData); // Actualizar usuario existente
    } else {
      // Asignar un ID único si es un nuevo registro
      const newId = `user_${Date.now()}`;
      addUser({ ...formData, id: newId }); // Añadir nuevo usuario
    }
    navigate('/'); // Volver a la página principal después de guardar
  };

  return (
    <div className="form-container"> 
      <h2>{id ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaKey className="input-icon" />
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            readOnly={!!id} // Hace el ID de solo lectura si estamos editando
            required
          />
        </div>
        <div className="input-group">
          <FaBook className="input-icon" />
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaVenusMars className="input-icon" />
          <input
            type="text"
            name="genero"
            placeholder="Género"
            value={formData.genero}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="date"
            name="fechaNacimiento"
            placeholder="Fecha de nacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          <FaCheck /> {id ? 'Guardar Cambios' : 'Crear'}
        </button>
      </form>
    </div>
  );
}

export default UserForm;