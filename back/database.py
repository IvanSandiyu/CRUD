import psycopg2
global connection
try:

    connection = psycopg2.connect(
    host='localhost',
    user='postgres',
    password='1234',
    database='Facultad',
    port='5432'
    
)
    print("Conexion exitosa") 
    connection.autocommit = True #Para que se actualicen los datos automaticamente 
    #cursor= connection.cursor()


except Exception as ex:
    print("Error al intentar la conexion: {0} ".format(ex))

# finally :  
#     #cursor.close()
#     connection.close()
