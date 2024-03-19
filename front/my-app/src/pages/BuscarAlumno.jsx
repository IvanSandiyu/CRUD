import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/BuscarAlumno.css";

function BuscarAlumno() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    async function fetchAlumnos() {
      const response = await fetch(
        "http://localhost:8000/api/mostrartodoslalumnos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify(),
        }
      );
      const data = await response.json();
      setAlumnos(data);
    }

    fetchAlumnos();
  }, []);
  const [dni, setDni] = useState(""); // Estado para almacenar el DNI ingresado
  const [alumnoBuscado, setAlumnoBuscado] = useState(null); // Estado para almacenar la información del alumno

  const handleInputChange = (event) => {
    setDni(event.target.value); // Actualizar el estado del DNI al escribir en el input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/buscaralumno/" + dni,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok || response.ok === null) {
        try {
          const data = await response.json();
          setAlumnoBuscado(data); // Almacenar la información del alumno en el estado
          const datosAlumno = document.getElementById("datosAlumno");
          console.log(setAlumnoBuscado);
          if (Object.keys(setAlumnoBuscado) != null) {
            datosAlumno.classList.remove("oculto");
          } else datosAlumno.classList.add("oculto");
        } catch (error) {
          alert("DNI no encontrado");
        }
      } else {
        alert("El DNI no existe");
        console.log(response);
        console.error("El DNI ingresado no existe :", response.statusText);
      }
    } catch (error) {
      console.error("Error al buscar el alumno:", error);
    }
  };

  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central">
          <form className="form-buscar-al" onSubmit={handleSubmit}>
            <div className="contenedor-form-buscar-al">
              <label className="label-dni-buscar-al" htmlFor="dni">
                {" "}
                Ingrese el DNI
              </label>
              <input
                type="text"
                className="dni-buscar-al"
                value={dni}
                onChange={handleInputChange}
                placeholder="DNI"
              />
            </div>

            <button
              id="mostrarDatosBtn"
              className="boton-enviar-buscar-al"
              type="submit"
            >
              Buscar
            </button>

          </form>
          <div id="datosAlumno" className="contenido-alumno-buscado oculto">
            {alumnoBuscado && (
              <div>
                <h2>Información del alumno:</h2>
                <p>
                  <strong>DNI:</strong> {alumnoBuscado.DNI}
                </p>
                <p>
                  <strong>Nombre:</strong> {alumnoBuscado.nombre}
                </p>
                <p>
                  <strong>Apellido:</strong> {alumnoBuscado.apellido}
                </p>
              </div>
            )}
            <h2 className="dni-inexistente dni-encontrado">DNI inexistente</h2>
          </div>
        </div>
        {/* <ul>
            {Array.isArray(alumnos) ? (
              alumnos.map((alumno) => (
                <li key={alumno}>
                  Nombre: {alumno.Nombre} - Apellido: {alumno.Apellido} - DNI:{" "}
                  {alumno.DNI}
                </li>
              ))
            ) : (
              <h1>
                <li>No se encontraron alumnos.</li>
              </h1>
            )}
          </ul> */}
      </div>
    </>
  );
}

export default BuscarAlumno;
