import { Link } from "react-router-dom";
import "../css/Botones_columna.css";

function Botones_columna() {
  return (
    <>
      <div className="col-2">
        <div className="menu">
          <nav>
            <ul className="ul-principal">
              <div className="accion-al">
                <li className="drop-al">
                  Accion alumno
                  <ul className="opciones">
                    <Link to="/CrearAlumno">
                      <li>Crear alumno</li>
                    </Link>
                    <Link to="/EliminarAlumno">
                      <li>Eliminar alumno</li>
                    </Link>
                    <Link to="/ModificarAlumno">
                      <li>Modificar alumno</li>
                    </Link>
                    <Link to="/AnotarAlumno">
                      <li>Anotar alumno</li>
                    </Link>
                    <Link to="/BuscarAlumno">
                      <li>Buscar alumno</li>
                    </Link>
                  </ul>
                </li>
              </div>
              <div className="accion-mesa">
                <li className="drop-mesa">
                  Accion mesa
                  <ul className="opciones-mesa">
                    <Link to="/CrearMesa">
                      <li>Crear mesa</li>
                    </Link>
                    <Link to="/EliminarMesa">
                      <li>Eliminar mesa</li>
                    </Link>
                    <Link to="/ModificarMesa">
                      <li>Modificar mesa</li>
                    </Link>
                    <Link to="/BuscarMesa">
                      <li>Buscar mesa</li>
                    </Link>
                    <Link to="/MostrarAlumnosMesa">
                      <li>Mostrar alumnos inscriptos</li>
                    </Link>
                    <Link to="/EliminarAlMesa">
                      <li>Eliminar Alumno de Mesa</li>
                    </Link>
                  </ul>
                </li>
              </div>
            </ul>
          </nav>
        </div>
        <Link to="/AccionAlumno"></Link>
        <Link to="/AccionMesa"></Link>
      </div>
    </>
  );
}

export default Botones_columna;
