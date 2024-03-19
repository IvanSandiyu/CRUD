import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import CrearAlumno from './pages/CrearAlumno';
import EliminarAlumno from './pages/EliminarAlumno';
import ModificarAlumno from './pages/ModificarAlumno';
import AnotarAlumno from './pages/AnotarAlumno';
import BuscarAlumno from './pages/BuscarAlumno';
import CrearMesa from './pages/CrearMesa';
import EliminarMesa from './pages/EliminarMesa';
import ModificarMesa from './pages/ModificarMesa';
import BuscarMesa from './pages/BuscarMesa';
import EliminarAlMesa from './pages/EliminarAlMesa';
import MostrarAlumnosMesa from './pages/MostrarAlumnos';
import Contenedor from './components/Contenedor';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={(<Contenedor />)}></Route>
          <Route path='/CrearAlumno' element={(<CrearAlumno />)}></Route>
          <Route path='/EliminarAlumno' element={(<EliminarAlumno />)}></Route>
          <Route path='/ModificarAlumno' element={(<ModificarAlumno />)}></Route>
          <Route path='/AnotarAlumno' element={(<AnotarAlumno />)}></Route>
          <Route path='/BuscarAlumno' element={(<BuscarAlumno />)}></Route>
          <Route path='/CrearMesa' element={(<CrearMesa />)}></Route>
          <Route path='/EliminarMesa' element={(<EliminarMesa />)}></Route>
          <Route path='/EliminarAlMesa' element={(<EliminarAlMesa />)}></Route>
          <Route path='/ModificarMesa' element={(<ModificarMesa />)}></Route>
          <Route path='/BuscarMesa' element={(<BuscarMesa />)}></Route>
          <Route path='/MostrarAlumnosMesa' element={(<MostrarAlumnosMesa />)}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
