# sistema-MEVN
Repositorio del proyecto del curso desarrollo fullstack MEVN

![MEVN](https://miro.medium.com/max/1400/1*HgJ-L3_LdA8bR_I8pcMehQ.png)

## Pruebas categoria con postman

Método HTTP |   URL |   Parámetros

POST    |   http://localhost:3000/api/categoria/add |   Body -> nombre(string-50) , descripcion(String-255)

GET |   http://localhost:3000/api/categoria/list    |   Query -> ?valor=texto

GET |   http://localhost:3000/api/categoria/query   |   Query -> ?_id=texto

PUT |   http://localhost:3000/api/categoria/update  |   Body -> _id(String) , nombre(string-50) , descripcion(String-255)

DELETE  |   http://localhost:3000/api/categoria/remove  |   Body -> _id(String)

PUT |   http://localhost:3000/api/categoria/activate    |   Body -> _id(String)

PUT |   http://localhost:3000/api/categoria/deactivate  |   Body -> _id(String)
