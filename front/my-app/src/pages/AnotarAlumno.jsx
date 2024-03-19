import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/AnotarAlumno.css";

function AnotarAlumno() {
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(""); // Estado para almacenar la materia seleccionada
  
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

 
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(""); // Estado para almacenar el alumno seleccionado

  useEffect(() => {
    async function fetchAlumnos() {
      const response = await fetch(
        "http://localhost:8000/api/mostrartodoslalumnos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      const data = await response.json();
      setAlumnos(data);
    }

    fetchAlumnos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dni = parseInt(alumnoSeleccionado);
      const id = parseInt(mesaSeleccionada);

      if (isNaN(dni) || (isNaN(id))) {
        throw new Error("Debe seleccionar alumnos y mesas válidas");
      }
      const response = await fetch(
        "http://localhost:8000/api/anotaralum/" + dni + "/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dni, id }), 
        }
      );
      const data = await response.json();
      if(!response.ok){
        alert(data.mensaje)
        throw new Error()
      }
      else alert(data.mensaje); //mensaje de exito
    }
    catch (error) {
      if(error.message === "Debe seleccionar alumnos y mesas válidas"){
        alert(error.message)
      }
      else alert("El alumno ya esta anotado a la mesa")
      }
        
    };
    //   if (response.ok) {
    //     alert("Alumno anotado con exito");
    //     console.log("Alumno anotado con éxito");
    //   }
    //   else throw new Error()
    // } catch (error) {
    //   alert("Error al anotar el alumno");
    //   console.error("Error al anotar el  alumno:", error);
    // }
      
  // Manejar cambio de materia seleccionada
  const handleChangeMesa = (event) => {
    setMesaSeleccionada(event.target.value);
  };
  // Manejar cambio de materia seleccionada
  const handleChangeAlumno = (event) => {
    setAlumnoSeleccionado(event.target.value);
  };
  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central">
          <form
            className="form-contenedor-principal-anotar-al"
            onSubmit={handleSubmit}
            action=""
          >
            <div className="contenedor-materias">
              <label className="label-materias" htmlFor="materias">
                Selecciona una materia:
              </label>
              <select
                id="combobox-materias"
                value={mesaSeleccionada.ID}
                onChange={handleChangeMesa}
              >
                <option id="opcion-deshabilitar">Seleccione una materia</option>
                {Array.isArray(mesas) ? (
                  mesas.map((materia) => (
                    <option
                      key={materia.ID}
                      value={materia.ID}
                      className="opcionMateria"
                    >
                      ID: {materia.ID} || Nombre: {materia.Materia} || Fecha:{" "}
                      {materia.Fecha}
                    </option>
                  ))
                ) : (
                  <option value="">No hay datos disponibles</option>
                )}
              </select>
            </div>
            <div className="contendor-al">
              <label className="label-al" htmlFor="alumnos">
                Selecciona el alumno:
              </label>
              <select
                id="combobox-al"
                value={alumnoSeleccionado.DNI}
                onChange={handleChangeAlumno}
              >
                <option id="opcion-deshabilitar">Seleccione un alumno</option>
                {Array.isArray(alumnos) ? (
                  alumnos.map((al) => (
                    <option
                      key={al.DNI}
                      value={al.DNI}
                      className="opcionAlumnos"
                    >
                      DNI: {al.DNI} || Nombre: {al.Nombre} || Apellido:{" "}
                      {al.Apellido}
                    </option>
                  ))
                ) : (
                  <option value="">No hay datos disponibles</option>
                )}
              </select>
            </div>

            <button type="submit" className="boton-enviar-anotar-al">
              Anotar Alumno
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default AnotarAlumno;
