import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/ModificarAlumno.css";


function ModificarAlumno() {
  const [alumnos, setAlumnos] = useState([]); // Para almacenar la lista de alumnos
  const [formData, setFormData] = useState([]); // Para almacenar los datos del formulario

  useEffect(() => {
    async function fetchAlumnos() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/mostrartodoslalumnos",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error al obtener la lista de alumnos:", error);
      }
    }

    fetchAlumnos();
  }, []);

  const handleEditClick = (alumno) => {
    // Cuando se hace clic en "Editar", establecemos los datos del alumno en el estado del formulario
    setFormData({
      nombre: alumno.Nombre,
      apellido: alumno.Apellido,
      dni: alumno.DNI,
    });
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    try {
      
      const response = await fetch(
        "http://localhost:8000/api/modificaralumno",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Alumno modificado con éxito");
        alert("Alumno modificado con exito!!!!");
        window.location.reload();
        
      } else {
        console.error("Error al modificar alumno: ", response.statusText);
      }
    } catch (error) {
      console.error("Error al modificar alumno:", error);
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
          <form className="form-modificar-al">
            <div className="tabla-form-modificar-al">
              <table>
                <thead>
                  <tr>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="tabla-datos-modificar-al">
                  {Array.isArray(alumnos) && alumnos.length > 0 ? (
                    alumnos.map((alumno) => (
                      <tr key={alumno.DNI}>
                        <td>{alumno.DNI}</td>
                        <td>
                          {formData.dni === alumno.DNI ? (
                            <input
                              id="inputNombre"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                            />
                          ) : (
                            alumno.Nombre
                          )}
                        </td>
                        <td>
                          {formData.dni === alumno.DNI ? (
                            <input
                              id="inputApellido"
                              name="apellido"
                              value={formData.apellido}
                              onChange={handleChange}
                            />
                          ) : (
                            alumno.Apellido
                          )}
                        </td>
                        <td>
                          {formData.dni === alumno.DNI ? (
                            <button type="button" onClick={handleSaveClick}>
                              Guardar
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleEditClick(alumno)}
                            >
                              Editar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No se encontraron alumnos.</td>
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
export default ModificarAlumno;
