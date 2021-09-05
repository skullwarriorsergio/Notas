# Gateways
Proyecto de prueba para un manejo simple de estudiantes, profesores y notas 

# Para comenzar

## Produccion
 ### Docker
  Es necesario tener Docker-engine, una vez que este en ejecución, puedes ejecutar el siguiente comando para iniciar el proyecto: 
  ``` docker-compose up --build```
  luego pueden acceder al proyecto en la siguiente url http://localhost:8080/
## Development
 ### Frontend
	Para ejecutar la aplicación web accede a la carpeta del proyecto, `` /frontend ``, una vez alli, ejecutar el siguientes comandos
	``npm run install`` y luego `` npm  run dev `` para iniciar el proyecto en modo desarrollo.
 ### WebAPI
	Dirigirse a la carpeta `` /WebAPI ``, dentro se encuentran 2 proyectos, la WebAPI y las pruebas unitarias
	puede ejecutar los comandos `` dotnet build`` para construir el proyecto y `` dotnet test`` para ejecutar las pruebas

## API
   Rutas disponibles:
	### ```/api/Estudiantes```
     METHODS: GET, POST, DELETE
	### ```/api/Profesores```
     METHODS: GET, POST, DELETE
	### ```/api/Notas```
     METHODS: GET, POST, DELETE
