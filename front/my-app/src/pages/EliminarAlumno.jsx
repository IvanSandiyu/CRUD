import React, { useState, useEffect } from "react";
import Botones_columna from "../components/Botones_columna";
import "../css/Contenedor.css";
import "../css/EliminarAlumno.css"

function EliminarAlumno() {
  const [dni, setDni] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/eliminaralumno/" + dni, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni }),
      });
      if(!response.ok){
        throw new Error("Error al eliminar el alumno")
      }
      const data = await response.json();
      alert(data.mensaje); 
      setDni("");
    }catch(error){
      alert("No se encontró ningún alumno con el DNI proporcionado"); 
    }
      /*
      if(!response.ok){
        throw new Error("Error al anotar el alumno")
      }
      const data = await response.json();
      alert(data.mensaje); //mensaje de exito
    }
    catch (error) {
      if (error.message === "Debe seleccionar alumnos y mesas válidas") {
        alert(error.message); // Manejo del primer error
      } else {
        alert("El alumno ya está inscripto a la mesa"); // Manejo del segundo error
      }
      */ 
    //   if (response.ok) {
    //     alert("Alumno eliminado con exito")
    //     console.log("Alumno eliminado con éxito");
    //     setDni(""); // Limpiar el campo DNI después de eliminar al alumno
    //   } else {
    //     console.error("Error al eliminar alumno:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error al eliminar alumno:", error);
    // }
  };

  const handleDNIChange = (event) => {
    setDni(event.target.value);
  };
  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central"> 
          <form onSubmit={handleSubmit} className="form-eliminar-al">
            <div className="contenedor-form-eliminar-al">
              <label className="label-dni-eliminar-al">Buscar mediante DNI</label>
              <input
                type="text"
                name="dni"
                className="input-dni-eliminar-al"
                autoComplete="off"
                value={dni}
                onChange={handleDNIChange}
                placeholder="DNI"
              />
            </div>
              <button type="submit" className="boton-enviar-eliminar-al">Eliminar Alumno</button>
          </form>
        </div>
        
      </div>
    </>
  );
}

export default EliminarAlumno;
