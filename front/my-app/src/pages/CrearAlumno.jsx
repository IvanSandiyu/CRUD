import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/Contenedor.css";
import "../css/CrearAlumno.css";

function CrearAlumno() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, dni }),
      });
      if(dni.length != 8){
             throw new Error("El DNI debe tener 8 numeros");
      }
      if(!response.ok){
        throw new Error("Error al anotar el alumno")
      }
      const data = await response.json();
      alert(data.mensaje); //mensaje de exito
      setNombre("");
      setApellido("");
      setDni("");
    }
    catch (error) {
      if (error.message === "El DNI debe tener 8 numeros") {
        alert(error.message); // Manejo del primer error
      } else {
        alert("El DNI ya existe"); // Manejo del segundo error
      }
    //   const data = await response.json();
    //   if(dni.length != 8){
    //     throw new Error("El DNI debe tener 8 numeros");
    //   }
    //   if (response.ok) {
    //     alert(data.message)
    //     //alert("Alumno creado con éxito");
    //     setNombre("");
    //     setApellido("");
    //     setDni("");
    //   } 
    // } catch (error) {
    //   alert("Error al crear el alumno")
    //   console.error("Error al crear alumno:", error);
    // }
  };
}

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleDNIChange = (event) => {
    setDni(event.target.value);
  };

  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central">
          <form onSubmit={handleSubmit} action="">
            <div className="contenedor-form-crear-alumno">
              <input
                type="text"
                className="nombre-crear-al"
                name="nombre"
                autoComplete="off"
                value={nombre}
                onChange={handleNombreChange}
                required
                placeholder="Nombre"
              />

              <input
                type="text"
                className="apellido-crear-al"
                autoComplete="off"
                value={apellido}
                onChange={handleApellidoChange}
                required
                placeholder="Apellido"
              />

              <input
                type="number"
                className="dni-crear-al"
                name="dni"
                autoComplete="off"
                value={dni}
                onChange={handleDNIChange}
                required
                placeholder="DNI"
              />

              <input
                type="submit"
                className="boton-enviar-crear-al"
                value="Crear"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CrearAlumno;
