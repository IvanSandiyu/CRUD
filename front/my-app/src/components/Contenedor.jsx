import Botones_columna from "../components/Botones_columna";
import "../css/Contenedor.css";

function Contenedor() {
  return (
    <>
      <div className="container">
        <Botones_columna />
        <div className="columna-central">
          <h1>Bienvenidos, este es mi primer CRUD.</h1>
          <h2>Este trabajo se realizó para presentarse en un trabajo final</h2>
        </div>
      </div>
    </>
  );
}

export default Contenedor;
