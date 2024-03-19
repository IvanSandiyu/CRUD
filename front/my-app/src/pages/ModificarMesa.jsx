import React, { useState, useEffect } from 'react';
import Botones_columna from "../components/Botones_columna";
import "../css/ModificarMesa.css";
function ModificarMesa() {

  const [mesas, setMesas] = useState([]); // Para almacenar la lista de mesas
  const [formData, setFormData] = useState({}); // Para almacenar los datos del formulario

  useEffect(() => {
    async function fetchMesas() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/mostrartodamesa",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setMesas(data);
      } catch (error) {
        console.error("Error al obtener la lista de alumnos:", error);
      }
    }

    fetchMesas();
  }, []);

  const handleEditClick = (mesa) => {
    // Cuando se hace clic en "Editar", establecemos los datos de la mesa en el estado del formulario
    setFormData({
      nombre: mesa.Materia,
      fecha: mesa.Fecha,
      id: mesa.ID,
    });
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    try {
      
      const response = await fetch("http://localhost:8000/api/actualizarmesa/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("mesa modificada con éxito");
        window.location.reload();
        
      } else {
        console.error("Error al modificar la mesa:", response.statusText);
      }
    } catch (error) {
      console.error("Error al modificar la mesa :", error);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
    return (
      <>
        <div className="container">
          <Botones_columna />
          <div className="columna-central">
          <form className="form-modificar-mesa">
            <div className="tabla-form-modificar-mesa">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Materia</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="tabla-datos-modificar-mesa">
                  {Array.isArray(mesas) && mesas.length > 0 ? (
                    mesas.map((mesa) => (
                      <tr key={mesa.ID}>
                        <td>{mesa.ID}</td>
                        <td>
                          {formData.id === mesa.ID ? (
                            <input
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                            />
                          ) : (
                            mesa.Materia//
                          )}
                        </td>
                        <td>
                          {formData.id === mesa.ID ? (
                            <input
                              type="date"
                              name="fecha"
                              value={formData.fecha}
                              onChange={handleChange}
                            />
                          ) : (
                            mesa.Fecha//
                          )}
                        </td>
                        <td>
                          {formData.id === mesa.ID ? (
                            <button type="button" onClick={handleSaveClick}>
                              Guardar
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleEditClick(mesa)}
                            >
                              Editar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No se encontraron mesas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </form>
          </div>
        </div>
      </>
    );
  }
  export default ModificarMesa;