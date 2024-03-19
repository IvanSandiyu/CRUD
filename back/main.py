from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware 
from Sistema import Sistema
from datetime import date
from datetime import datetime
from typing import Optional

app = FastAPI()
# Configurar el middleware CORS para permitir solicitudes desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Esto permitirá solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT" , "DELETE" ],  # Especifica los métodos HTTP permitidos
    allow_headers=["*"],  # Esto permitirá todos los encabezados en las solicitudes
)

class AlumnoModel(BaseModel):
     nombre: str
     apellido: str
     dni: int

class MesaModel(BaseModel):
    nombre: str
    fecha: date
    id : Optional[int]  = None

class AlumnoMesa(BaseModel):
    dni: int
    id : int


@app.get('/') 
def root(): 
    return ""

@app.post('/api/alumnos')
async def crear_alumno(al:AlumnoModel):
    nombre = al.nombre
    apellido = al.apellido
    dni = al.dni
    mensaje = Sistema.CrearAlumno(nombre,apellido,dni)
    bandera = mensaje.ObternerBandera()
    if not bandera:
         return {"mensaje": "Ya existe un alumno con ese DNI"}
    else:
        return {"mensaje": "El alumno ha sido creado exitosamente!!"}
       

@app.delete('/api/eliminaralumno/{dni}')
async def eliminar_alumno(dni):
    mensaje = Sistema.EliminarAlumno(dni)
    print(mensaje)
    if not mensaje:
        return {"mensaje": "No se encontró ningún alumno con el DNI proporcionado"}
    else:
        return {"mensaje": "Alumno eliminado con éxito" }
    

@app.put('/api/modificaralumno')
async def modificar_alumno(al: AlumnoModel):
    print("entro main")
    nombre = al.nombre
    apellido = al.apellido
    dni = al.dni
    print(nombre,apellido,dni)
    mensaje = Sistema.ActualizarAlumno(nombre,apellido,dni)
    return mensaje

@app.get('/api/buscaralumno/{dni}')
async def buscar_al(dni:int):
    alumno = Sistema.BuscarAlumno(dni)
    return alumno
    
@app.get('/api/mostrartodoslalumnos')
async def mostrar_alumnos():
    listado = Sistema.MostrarTodosAlumnos()
    return listado


@app.post('/api/crearmesa')
async def crear_mesa(m: MesaModel):
    nombre = m.nombre
    fecha = m.fecha 
    mensaje = Sistema.CrearMesa(nombre,fecha)
    if mensaje.mensaje == "Error al crear mesa":
        raise HTTPException(status_code=404, detail= {""})
    else: 
        return {f"mensaje": "Mesa creada con exito"}
    
    

@app.delete('/api/eliminarmesa/{id}')
async def eliminar_mesa(id):
    mensaje = Sistema.EliminarMesa(id)
    return mensaje
    
@app.put('/api/actualizarmesa')
async def modificar_mesa(m: MesaModel):
    nombre = m.nombre
    fecha = m.fecha
    id = m.id
    mensaje = Sistema.ModificarMesa(id,nombre,fecha)
    return mensaje
    
    
@app.get('/api/listadoAlins/{id}')
async def listado_alumnos_inscriptos(id):
    listado = Sistema.MostrarAlumnosListados(id)
    print(listado)
    return listado
    

@app.get('/api/mostrartodamesa')
async def mostrar_todas_mesas():
    listado = Sistema.ListarMesas()
    return listado

@app.get('/api/mostrarmesa/{id}')
async def mostrar_mesa(id):
    m = Sistema.MostrarMesa(id)
    return m

@app.post('/api/anotaralum/{dni}/{id}')
async def anotarAlumnos(dni,id) :
    mensaje = Sistema.AnotarAlumnosMesa(dni,id)
    if not mensaje:
         raise HTTPException(status_code=404, detail= {"El alumno ya se encuentra inscripto a la mesa"})
    else:
         return {"mensaje": "El alumno ha sido anotado exitosamente!!"}
         

@app.delete('/api/eliminaralmesa/{dni}/{id}')
async def eliminar_al_mesa(dni,id):
    print("entro eliminar al mesa")
    mensaje = Sistema.EliminarAlMesa(dni,id)
    return mensaje
    # print(mensaje)
    # if not mensaje:
    #     return {"mensaje" : "Error al eliminar alumno de la mesa"}
    # else:
    #     return {"mensaje" : "Alumno eliminado de la mesa con exito"}