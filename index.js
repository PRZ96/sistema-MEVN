//const express=require('express'); //Indico que voy a requerir el modulo express y lo almaceno en la variable
import express from "express"; //Express es el framwork de node para crear aplicaciones
//const morgan=require('morgan');
import morgan from "morgan"; //Middleware para revisar peticiones y errores HTTP
//const cors=require('cors'); ECMAscript5
import cors from "cors"; //Middleware para aceptar o rechazar peticiones HTTP
import path from "path"; //Modulo que permite interactuar con rutas facilmente
import mongoose from "mongoose"; //Biblioteca de POO para crear una conexion entre MongoDB y Node.js

//Conexion a la base de datos MongoDB
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/dbsistema";
//mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser:true})
mongoose
  .connect(dbUrl)
  .then((mongoose) => console.log("Conectando a la BD en el puerto 27017"))
  .catch((err) => console.log(err));

const app = express(); //app es un objeto que instancia a express
app.use(morgan("dev")); //Usamos morgan
app.use(cors());

app.use(express.json()); //Indicamos a nuestro backend que pueda recibir peticiones por el middleware json y el metodo post
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("server on port " + app.get("port"));
  // console.log('ruta: ' + __dirname + '\\public'); //Esto podemos hacerlo más sencillo con path
  // console.log(path.join(__dirname,'public')); //Muestra la ruta donde se van a ubicar mis archivos publicos
});
