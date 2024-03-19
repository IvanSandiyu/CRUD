import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/MostrarAlumnosMesa.css";
function MostrarAlumnosMesa() {
  const [mesas, setMesas] = useState([]);
  const [id, setID] = useState("");
  const [mesaBuscada, setMesaBuscada] = useState(null);
  const [alumnos, setAlumnos] = useState([]);

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

  const handleInputChange = (event) => {
    setID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseMesa = await fetch(
        "http://localhost:8000/api/mostrarmesa/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseMesa.ok || responseMesa != null || responseMesa != undefined) {
        const dataMesa = await responseMesa.json();
        setMesaBuscada(dataMesa);
        const responseAlumnos = await fetch(
          "http://localhost:8000/api/listadoAlins/" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (responseAlumnos.ok) {
          const dataAlumnos = await responseAlumnos.json();
          setAlumnos(dataAlumnos);
        } else {
          console.error(
            console.log("Error al obtener la información de los alumnos:",
            responseAlumnos.statusText)
          );
        }
      } else {
        alert("ID inexistente")
        console.error("El ID ingresado no existe :", responseMesa.statusText);
      }
    } catch (error) {
      console.error("Error al buscar la mesa:", error);
    }
  };

  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central">
          <div className="contenedor-columnas">
            <div className="columna-izquierda">
              <div className="contenedor-form-al-inscriptos">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="id">Ingrese el ID:</label>
                  <input
                    type="text"
                    id="input-id-mostrar-al"
                    value={id}
                    onChange={handleInputChange}
                  />
                  <button className="boton-buscar-mesa" type="submit">Buscar</button>
                </form>
              </div>
            </div>
            <div className="columna-derecha">
              <div className="tabla-mesa-buscada">
                <table>
                  <thead>
                    <tr>
                      <th> ID </th>
                      <th> Materia </th>
                      <th> Fecha </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{mesaBuscada?.ID} </td>
                      <td>{mesaBuscada?.nombre}</td>
                      <td>{mesaBuscada?.fecha}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tabla-alumnos-inscriptos-mesa">
                <table>
                  <thead>

                    <tr> 
                      <th> DNI </th>
                      <th> Nombre </th>
                      <th> Apellido </th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnos.map((alumno) => (
                      <tr key={alumno.dni}>
                        <td>{alumno.DNI}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.apellido}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* {mesaBuscada && (
                  <div>
                    <h3>Información de la mesa:</h3>
                    <p>
                      <strong>ID:</strong> {mesaBuscada.ID}
                    </p>
                    <p>
                      <strong>Nombre:</strong> {mesaBuscada.nombre}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {mesaBuscada.fecha}
                    </p>
                    <h3>Alumnos inscriptos:</h3>
                    <ul>
                      {alumnos.map((alumno) => (
                        <li key={alumno.dni}>
                          <strong> DNI:</strong> {alumno.DNI} <strong> Nombre:</strong> {alumno.nombre} Apellido: {alumno.apellido}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            </div>

            {/* <ul>
            {Array.isArray(mesas) ? (
              mesas.map((mesa) => (
                <li key={mesa.ID}>
                  ID: {mesa.ID} - Materia: {mesa.Materia} - Fecha: {mesa.Fecha}
                </li>
              ))
            ) : (
              <h1>
                <li>No se encontraron mesas.</li>
              </h1>
            )}
          </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MostrarAlumnosMesa;
