import database
from pydantic import BaseModel
class Alumnos:
    def __init__(self,nombre,apellido,dni):
         conn = database.connection
         self.nombre = nombre;
         self.apellido = apellido;
         self.dni = dni;
         self.bandera = True
         try:
             sql = "INSERT INTO Alumno(dni,nombre,apellido) VALUES (%s, %s, %s)"
             cursor = conn.cursor()
             cursor.execute(sql,(dni,nombre,apellido))
             conn.commit()
             cursor.close()
             print("Alumno creado con exito") 
        
         except Exception as ex:
              self.bandera = False
              print ("Error al crear alumno " + str(ex))
            
    def ObternerBandera(self):
        return self.bandera
         
         
    @staticmethod
    def eliminarAlumno(dni):
        conn = database.connection
        try:
            print("entro lcdtnm")
            sql = "DELETE FROM alumno WHERE dni = %s"
            cursor = conn.cursor()
            print("ej1")
            cursor.execute(sql,(dni,))
            print("ej")
            al = cursor.rowcount #Verifico si se ha encontrado algun alumno con el dni
            conn.commit()
            cursor.close()
            print(al)
            if al == 0: 
                return False #{'message:' "No se encontró ningún alumno con el DNI proporcionado"} 
            else:
                return True#{'message:' "Alumno eliminado con éxito" }
        
        except Exception as ex:
            return False#{'message:' "Error al eliminar alumno" + str(ex)}
        

    def actualizarAlumno(nombre,apellido,dni):
        conn = database.connection
        print("en el def")
        try:
            print(nombre,apellido,dni)
            sql = "UPDATE alumno SET nombre = %s, apellido =  %s  WHERE dni = %s"
            print("paso sql")
            cursor = conn.cursor()
            print("paso cursor")
            cursor.execute(sql, (nombre,apellido,dni,))
            print("paso exe")
            conn.commit()
            cursor.close()
            return "Alumno creado con exito"

        except Exception as ex:
            return "Error al modificar el alumno " + str(ex)
        

    @staticmethod
    def BuscarAlumno(dni):
        conn = database.connection
        try:
            sql = "SELECT  * FROM alumno WHERE dni = %s "
            cursor = conn.cursor()
            cursor.execute(sql,(dni,))
            alumno = cursor.fetchone()
            conn.commit()
            cursor.close()
            if alumno:
                print(alumno)
                return {"DNI": alumno[0], "nombre": alumno[1], "apellido": alumno[2]}
            else:
                return print("Alumno no encontrado")
            
        except Exception as ex:
            return print("Error al buscar alumno" + str(ex))

       

    @staticmethod
    def MostrarTodosAlumnos():
        conn = database.connection
        try:
            sql = "SELECT * FROM Alumno "
            cursor = conn.cursor()
            cursor.execute(sql)
            lista = [{"DNI": alumno[0], "Nombre": alumno[1], "Apellido": alumno[2]} for alumno in cursor.fetchall()]
            cursor.close()
            return lista
        
        except Exception as ex:
            return " Error al mostrar los alumnos " + " ... " +  str (ex)
        


    
    
   
    
    
    
    

