import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/BuscarMesa.css";
function BuscarMesa() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    async function fetchMesas() {
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
    }

    fetchMesas();
  }, []);

  const [id, setID] = useState(""); // Estado para almacenar el DNI ingresado
  const [mesaBuscada, setMesaBuscada] = useState(null); // Estado para almacenar la información del alumno

  const handleInputChange = (event) => {
    setID(event.target.value); // Actualizar el estado del ID al escribir en el input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/mostrarmesa/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message)
        setMesaBuscada(data); // Almacenar la información de la mesa en el estado
      } else {
        alert(data.message)
        console.error("El ID ingresado no existe :", response.statusText);
      }
    } catch (error) {
      console.error("Error al buscar la mesa:", error);
    }
  };
  return (
    <>
      <div class="container">
        <Botones_columna />
        <div class="columna-central">
          <div>
            <form className="form-buscar-mesa" onSubmit={handleSubmit}>
              <div className="contenedor-form-buscar-mesa">
                <label className="label-id-buscar-mesa " htmlFor="id">
                  Ingrese el ID:
                </label>
                <input
                  type="text"
                  className="id-buscar-mesa"
                  value={id}
                  onChange={handleInputChange}
                />
              </div>

              <button className="boton-enviar-buscar-mesa" type="submit">
                Buscar
              </button>
            </form>
            <div className="contenido-mesa-buscada oculta">
              {mesaBuscada && (
                <div>
                  <h2>Información de la mesa:</h2>
                  <p>
                    <strong>ID:</strong> {mesaBuscada.ID}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {mesaBuscada.nombre}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {mesaBuscada.fecha}
                  </p>
                </div>
              )}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Materia</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(mesas) && mesas.length > 0 ? (
                mesas.map((mesa) => (
                  <tr key={mesa.ID}>
                    <td>{mesa.ID}</td>
                    <td>{mesa.Materia}</td>
                    <td>{mesa.Fecha}</td>
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
      </div>
    </>
  );
}
export default BuscarMesa;
