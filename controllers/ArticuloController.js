import { model } from "mongoose";
import models from "../models";

export default {
  add: async (req, res, next) => {
    //permite agregar un Articulo
    try {
      const reg = await models.Articulo.create(req.body); //Recibe el objeto y crea el registro
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
    //consultar un Articulo
    try {
      const reg = await models.Articulo.findOne({ _id: req.query._id }) //Busca el Articulo con el id enviado en el query con el parametro req
        .populate("categoria", { nombre: 1 }); //poblar articulos con su categoria respectiva
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
    //Enlistar Articulo
    try {
      let valor = req.query.valor;
      const reg = await models.Articulo.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { descripcion: new RegExp(valor, "i") },
          ],
        }, //Agregamos que busque en el nombre o en descripcion
        { createdAt: 0 }
      )
        .populate("categoria", { nombre: 1 }) //poblar articulos con su categoria respectiva
        .sort({ createdAt: -1 }); //Ordenamos de forma descentente con -1, usar 1 para forma ascendente
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    //Actualizar los datos de un Articulo especifico
    try {
      const reg = await models.Articulo.findByIdAndUpdate(
        { _id: req.body._id }, //Parametro de busqueda
        {
          categoria: req.body.categoria,
          codigo: req.body.codigo,
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          precio_venta: req.body.precio_venta,
          stock: req.body.stock,
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
      const reg = await models.Articulo.findByIdAndDelete({
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
    //Activar un Articulo desactivado
    try {
      const reg = await models.Articulo.findByIdAndUpdate(
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
    //Desactivar un Articulo activado
    try {
      const reg = await models.Articulo.findByIdAndUpdate(
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
