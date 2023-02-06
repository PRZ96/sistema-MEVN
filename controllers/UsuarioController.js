import { model } from "mongoose";
import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {
  add: async (req, res, next) => {
    //permite agregar un usuario
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10); //Recibimos el valor de password, lo encriptamos y lo sobreescribimos en password.
      const reg = await models.Usuario.create(req.body); //Recibe el objeto y crea el registro
      res.status(200).json(reg); //Devuelvo un ok y el registro
    } catch (e) {
      res.status(500).send({
        //Devolvemos bad request y enviamos en un array el texto de error
        message: "Ocurrio un error",
      });
      next(e); //Devolvemos el error con morgan
    }
  },
  query: async (req, res, next) => {
    //consultar un usuario
    try {
      const reg = await models.Usuario.findOne({ _id: req.query._id }); //Busca el usuario con el id enviado en el query con el parametro req
      if (!reg) {
        //Si no se encuentra el registro
        res.status(404).send({
          //respondemos con error de no encontrado y el mensaje
          message: "El registro no existe",
        });
      } else {
        res.status(200).json(reg); //Devolvemos ok
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    //Enlistar usuario
    try {
      let valor = req.query.valor;
      const reg = await models.Usuario.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
        }, //Agregamos que busque en el nombre o en descripcion
        { createdAt: 0 }
      ).sort({ createdAt: -1 }); //Ordenamos de forma descentente con -1, usar 1 para forma ascendente
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    //Actualizar los datos de un usuario especifica
    try {
      let pas = req.body.password; //obtener password desde frontend
      const reg0 = await models.Usuario.findOne({ _id: req.body._id }); //guardar el usuario como se encuentra actualmente en reg0
      if (pas != reg0.password) {
        //si el password enviado desde frontend es diferente al password actual, que encripte la nueva contraseña
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id }, //Parametro de busqueda
        {
          rol: req.body.rol,
          nombre: req.body.nombre,
          tipo_documento: req.body.tipo_documento,
          num_documento: req.body.num_documento,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          email: req.body.email,
          password: req.body.password,
        } //Parametro de valores a cambiar en el registro
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    //Eliminar un registro
    try {
      const reg = await models.Usuario.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    //Activar un usuario desactivada
    try {
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 } //Valor a actualizar
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    //Desactivar un usuario activada
    try {
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 } //Valor a actualizar
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      let user = await models.Usuario.findOne({ email: req.body.email, estado: 1 }); //Buscamos el usuario por el email ingresado y verificar que el usuario sea activo
      if (user) {
        //Si existe el usuario con ese email
        let match = await bcrypt.compare(req.body.password, user.password); //Compara la contraseña ingresada con la actual
        if (match) {
          //Si coinciden las contraseñas
          let tokenReturn = await token.encode(user._id); //Llamada a función token.encode enviando el _id de user
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(404).send({
            message: "Password incorrecto",
          });
        }
      } else {
        res.status(404).send({
          message: "No existe el usuario",
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
};
