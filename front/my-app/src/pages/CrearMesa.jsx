import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/CrearMesa.css";
function CrearMesa() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(new Date());
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/crearmesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombre, fecha: fecha }),
      });
      
      if (response.ok) {
        alert("Mesa creada con exito");
        setNombre("");
        setFecha("");
      }
      else { 
        //alert("Error al crear la mesa")
        throw new Error()
      }
      
    } catch (error) {
      alert("No se pudo crear la mesa");
      console.error("Error al crear la mesa:", error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central">
          <form onSubmit={handleSubmit} action="">
            <div className="contenedor-form-crear-mesa">
              <input
                type="text"
                name="Nombre"
                className="nombre-crear-mesa"
                autoComplete="off"
                value={nombre}
                onChange={handleNombreChange}
                required
                placeholder="materia"
              />

              <input
                type="date"
                name="Fecha"
                className="fecha-crear-mesa"
                autoComplete="off"
                value={fecha}
                onChange={handleFechaChange}
                required
              />
              <input
                type="submit"
                className="boton-enviar-crear-mesa"
                value="Crear"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CrearMesa;
