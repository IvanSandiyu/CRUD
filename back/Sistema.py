from Alumnos import Alumnos
from Mesas import Mesas

class Sistema:
    pass

    def CrearAlumno(nombre,apellido,dni):
        mensaje = Alumnos(nombre,apellido,dni)
        return mensaje;

    @staticmethod
    def EliminarAlumno(dni):
        mensaje = Alumnos.eliminarAlumno(dni)
        return mensaje
    
    def ActualizarAlumno(nombre,apellido,dni):
        mensaje = Alumnos.actualizarAlumno(nombre,apellido,dni)
        return mensaje
    
    def BuscarAlumno(dni):
        mensaje = Alumnos.BuscarAlumno(dni)
        return mensaje
    
    def MostrarTodosAlumnos():
        lista = Alumnos.MostrarTodosAlumnos()
        return lista
    
    def CrearMesa(nombre,fecha):
        mensaje = Mesas(nombre,fecha)
        return mensaje
    
    def EliminarMesa(id):
        mensaje = Mesas.eliminarMesa(id)
        return mensaje
    
    def ModificarMesa(id,nombre,fecha):
        mensaje = Mesas.modificarMesa(id,nombre,fecha)
        return mensaje
    
    def MostrarAlumnosListados(id):
        mensaje = Mesas.mostarAlumnosListados(id)
        return mensaje
    
    def ListarMesas():
        mensaje = Mesas.listarMesas()
        return mensaje
    
    def MostrarMesa(id):
        mensaje = Mesas.mostrarMesa(id)
        return mensaje

    def AnotarAlumnosMesa(dni, id):
        mensaje = Mesas.anotarAlumnoMesa(dni,id)
        return mensaje
    
    def EliminarAlMesa(dni,id):
        mensaje = Mesas.eliminarAlumnoMesa(dni,id)
        return mensaje