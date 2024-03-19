import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/Contenedor.css";


function EliminarAlMesa() {
  const [dni, setDni] = useState();
  const [id, setID] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/eliminaralmesa/" + dni + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni,id }),
      });
         if (response.ok) {
        alert("Alumno eliminado de la mesa con exito")
        console.log("Alumno eliminado con éxito");
        setDni(""); // Limpiar el campo DNI después de eliminar al alumno
        setID("");
      } else {
        console.error("Error al eliminar alumno:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
    }
  }

    //   if(!response.ok){
    //     throw new Error()
    //   }
    //   const data = await response.json();
    //   alert(data.mensaje); //mensaje de exito
    // }
    // catch (error) {
    //     alert("Error al eliminar el alumno de la mesa"); // Manejo del primer error
    //   }
    // }
   
  
  const handleDNIChange = (event) => {
    setDni(event.target.value);
  };
  const handleIDChange = (event) => {
    setID(event.target.value);
  };
  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central"> 
          <form onSubmit={handleSubmit} className="form-eliminar-al">
            <div className="contenedor-form-eliminar-al">
              <label className="label-dni-eliminar-al">Seleccionar DNI</label>
              <input
                type="text"
                name="dni"
                className="input-dni-eliminar-al"
                autoComplete="off"
                value={dni}
                onChange={handleDNIChange}
                placeholder="DNI"
              />
              <label className="label-dni-eliminar-al">Seleccionar Mesa</label>
              <input
                type="text"
                name="id"
                className="input-dni-eliminar-al"
                autoComplete="off"
                value={id}
                onChange={handleIDChange}
                placeholder="ID"
              />
            </div>
              <button type="submit" className="boton-enviar-eliminar-al">Eliminar Alumno</button>
          </form>
        </div>
        
      </div>
    </>
  );
}

export default EliminarAlMesa;
