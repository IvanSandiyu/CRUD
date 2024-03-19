import React, { useState, useEffect } from 'react';
import Botones_columna from "../components/Botones_columna";
import "../css/EliminarMesa.css"

function EliminarMesa() {

  const [id, setID] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const mesa_id = parseInt(id)

    try {
      const response = await fetch("http://localhost:8000/api/eliminarmesa/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok || response.ok === null) {
        alert(data.message)
        console.log("mesa eliminada con éxito");
        // Aquí podrías hacer algo, como actualizar la lista de mesas
      } else {
        alert(data.message)
        console.error("Error al eliminar la mesa:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar la mesa :", error);
    }

  };
  const handleIDChange = (event) => {
    setID(event.target.value);
  };
    return (
      <>
        <div className="container">
          <Botones_columna />
          <div className="columna-central">
          <form onSubmit={handleSubmit} className="form-eliminar-mesa">
            <div className="contenedor-form-eliminar-mesa">
              <label className="label-id-eliminar-mesa">Buscar mediante ID</label>
              <input
                type="text"
                name="id"
                className="input-id-eliminar-mesa"
                autoComplete="off"
                value={id}
                onChange={handleIDChange}
              />
            </div>
            <button className ="boton-enviar-eliminar-mesa"type="submit">Eliminar Mesa</button>
          </form>
          </div>
        </div>
      </>
    );
  }
  export default EliminarMesa;