import database
from datetime import datetime
class Mesas:
    def __init__(self,nombre,fecha):
        conn = database.connection
        self.nombre= nombre
        self.fecha= fecha
        fechaActual = datetime.now()
        fechaActualDate = fechaActual.date()
        print(fechaActualDate, "y", fecha)
        try:
            if nombre is not None and nombre.strip() != "" and fechaActualDate < fecha:
                sql = "INSERT INTO mesa(materia,fecha) VALUES (%s, %s) "
                cursor = conn.cursor()
                cursor.execute(sql, (self.nombre,self.fecha))
                conn.commit() 
                cursor.close()
                self.mensaje = "Mesa creada"
                print("Mesa creada")
            else:
                raise Exception()
        except Exception as ex:
            self.mensaje = "Error al crear mesa"
            print("Error al crear mesa" + str(ex))
            
       
    def eliminarMesa(id):
        conn = database.connection
        try:
            id_int = int(id)
            sql = "DELETE FROM Mesa WHERE id = %s  "
            cursor = conn.cursor()
            cursor.execute(sql,(id_int,))
            m = cursor.rowcount #Verifico si se ha encontrado alguna mesa con el id
            conn.commit()
            cursor.close()
            if m == 0: 
                return {f'message': 'No se encontró ninguna mesa con el ID proporcionado'}
            return {"message": "Mesa eliminada con éxito"}

        except Exception as ex:
          print("Error al eliminar la mesa")



    def modificarMesa(id,nombre,fecha):
        conn = database.connection
        try:
            sql = "UPDATE mesa SET  materia = %s, fecha =  %s WHERE id = %s"
            cursor = conn.cursor()
            cursor.execute(sql,(nombre,fecha,id))
            m = cursor.rowcount #Verifico si se ha encontrado alguna mesa con el id
            conn.commit()
            cursor.close()
            if m == 0: 
                return {'message': 'No se encontró ninguna mesa con el ID proporcionado'}
            else:
                return print("Mesa modificada con exito")
    
        except Exception as ex:
            return print("Error al modificar mesa")
   
   
    def mostarAlumnosListados(id):
        conn = database.connection
        try:
            sql = "SELECT a.* FROM alumno a JOIN alumnosmesa am ON a.dni = am.dni_alumno JOIN mesa m ON m.id = am.id_mesa WHERE m.id=%s" 
            cursor = conn.cursor()
            cursor.execute(sql, (id,))
            print("ejecuta")
            lista = [{"DNI": alumno[0], "nombre": alumno[1], "apellido": alumno[2]} for alumno in cursor.fetchall()]
            cursor.close()
            return lista

        except Exception as ex:
            return print("Error al listar los alumnos")
   
    
    def listarMesas():
        conn = database.connection
        try:
            sql = "SELECT * FROM Mesa"
            cursor = conn.cursor()
            cursor.execute(sql)
            lista = [{"ID": mesa[0], "Materia": mesa[1], "Fecha": mesa[2]} for mesa in cursor.fetchall()]
            cursor.close()
            return lista

        except Exception as ex:
            return "Error al listar"
    
    def mostrarMesa(id):
        conn = database.connection
        try:
            sql = "SELECT * FROM Mesa where id = %s "
            cursor = conn.cursor()
            cursor.execute(sql, (id,))
            m = cursor.fetchone() #Verifico si se ha encontrado alguna mesa con el id
            cursor.close()
            if m: 
                 return {"ID": m[0], "nombre": m[1], "fecha": m[2]}
            return print("Informacion de la mesa: ", m)

        except Exception as ex:
            return "Error al encontrar la mesa"    
        

    def anotarAlumnoMesa(dni, id):
        conn = database.connection
        try:
            sql = "INSERT INTO alumnosmesa (dni_alumno,id_mesa) VALUES (%s, %s) "
            cursor = conn.cursor()
            cursor.execute(sql, (dni,id))
            cursor.close()
            return True 
        
        except Exception as ex:
            return False
        
    def eliminarAlumnoMesa(dni,id):
        conn = database.connection
        try:
            sql = "DELETE FROM alumnosmesa WHERE dni_alumno = %s AND id_mesa = %s"
            cursor = conn.cursor()
            cursor.execute(sql,(dni,id))
            conn.commit()
            cursor.close()
          
        except Exception as ex:
            print("Error al eliminar alumno de la mesa" + str(ex))
            return False 