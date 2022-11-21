import { model } from "mongoose";
import models from "../models";
export default {
  add: async (req, res, next) => {
    //permite agregar una categoria
    try {
      const reg = await models.Categoria.create(req.body); //Recibe el objeto y crea el registro
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
    //consultar una categoria
    try {
      const reg = await models.Categoria.findOne({ _id: req.query._id }); //Busca la categoria con el id enviado en el query con el parametro req
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
    //Enlistar categoria
    try {
      let valor = req.query.valor;
      const reg = await models.Categoria.find(
        {$or:[{ nombre: new RegExp(valor, "i") }, { descripcion: new RegExp(valor, "i") }]}, //Agregamos que busque en el nombre o en descripcion
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
    //Actualizar los datos de una categoria especifica
    try {
      const reg = await models.Categoria.findByIdAndUpdate(
        { _id: req.body._id }, //Parametro de busqueda
        { nombre: req.body.nombre, descripcion: req.body.descripcion } //Parametro de valores a cambiar en el registro
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
      const reg = await models.Categoria.findByIdAndDelete({
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
    //Activar una categoria desactivada
    try {
      const reg = await models.Categoria.findByIdAndUpdate(
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
    //Desactivar una categoria activada
    try {
      const reg = await models.Categoria.findByIdAndUpdate(
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
};
