import { Link } from "react-router-dom";
import "../css/Header.css";


function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1>Crud de mesas y alumnos</h1>
      </Link>
    </header>
  );
}

export default Header;
