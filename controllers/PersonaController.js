import models from "../models";

export default {
  add: async (req, res, next) => {
    //permite agregar una persona
    try {
      const reg = await models.Persona.create(req.body); //Recibe el objeto y crea el registro
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
    //consultar una persona
    try {
      const reg = await models.Persona.findOne({ _id: req.query._id }); //Busca persona con el id enviado en el query con el parametro req
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
    //Enlistar persona
    try {
      let valor = req.query.valor;
      const reg = await models.Persona.find(
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
  listClientes: async (req, res, next) => {
    //Enlistar persona
    try {
      let valor = req.query.valor;
      const reg = await models.Persona.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
          tipo_persona: "Cliente",
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
  listProveedores: async (req, res, next) => {
    //Enlistar persona
    try {
      let valor = req.query.valor;
      const reg = await models.Persona.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
          tipo_persona: "Proveedor",
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
    //Actualizar los datos de una persona especifica
    try {
      const reg = await models.Persona.findByIdAndUpdate(
        { _id: req.body._id }, //Parametro de busqueda
        {
          tipo_persona: req.body.tipo_persona,
          nombre: req.body.nombre,
          tipo_documento: req.body.tipo_documento,
          num_documento: req.body.num_documento,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          email: req.body.email,
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
      const reg = await models.Persona.findByIdAndDelete({
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
    //Activar una Persona desactivada
    try {
      const reg = await models.Persona.findByIdAndUpdate(
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
    //Desactivar una Persona activada
    try {
      const reg = await models.Persona.findByIdAndUpdate(
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
