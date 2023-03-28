import models from "../models";

async function aumentarStock(idarticulo, cantidad) {
  let { stock } = await models.Articulo.findOne({ _id: idarticulo }); //Obtener el stock de ese articulo
  let nStock = parseInt(stock) + parseInt(cantidad); //Sumar el antiguo stock, con el nuevo stock
  const reg = await models.Articulo.findByIdAndUpdate({ _id: idarticulo }, { stock: nStock }); //Actualizar el stock anterior con el nuevo stock
}

async function disminuirStock(idarticulo, cantidad) {
    let { stock } = await models.Articulo.findOne({ _id: idarticulo }); //Obtener el stock de ese articulo
    let nStock = parseInt(stock) - parseInt(cantidad); //Restar el antiguo stock, con el nuevo stock
    const reg = await models.Articulo.findByIdAndUpdate({ _id: idarticulo }, { stock: nStock }); //Actualizar el stock anterior con el nuevo stock
  }

export default {
  add: async (req, res, next) => {
    //permite agregar un venta
    try {
      const reg = await models.Venta.create(req.body); //Recibe el objeto y crea el registro
      // Actualizar Stock
      let detalles = req.body.detalles;
      detalles.map(function (x) {
        //Recorrer el array y trabajar cada objeto como x
        disminuirStock(x._id, x.cantidad);
      });
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
      const reg = await models.Venta.findOne({ _id: req.query._id }) //Busca el venta con el id enviado en el query con el parametro req
        .populate("usuario", { nombre: 1 })
        .populate("persona", { nombre: 1 });
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
    //Enlistar ventas
    try {
      let valor = req.query.valor;
      const reg = await models.Venta.find({
        $or: [
          { num_comprobante: new RegExp(valor, "i") },
          { serie_comprobante: new RegExp(valor, "i") },
        ],
      }) //Agregamos que busque en el numero de comprobante o en serie del comprobante
        .populate("usuario", { nombre: 1 })
        .populate("persona", { nombre: 1 })
        .sort({ createdAt: -1 }); //Ordenamos de forma descentente con -1, usar 1 para forma ascendente
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  /* Como no se deben eliminar o modificar los ventas, deshabilito las siguientes funciones update y remove */
  /*   update: async (req, res, next) => {
    //Actualizar los datos de un venta especifico
    try {
      const reg = await models.Venta.findByIdAndUpdate(
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
    //Eliminar un venta
    try {
      const reg = await models.Venta.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  }, */
  activate: async (req, res, next) => {
    //Activar una venta desactivada
    try {
      const reg = await models.Venta.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 } //Valor a actualizar
      );
      // Actualizar Stock
      let detalles = reg.detalles;
      detalles.map(function (x) {
        //Recorrer el array y trabajar cada objeto como x
        disminuirStock(x._id, x.cantidad);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    //Desactivar un venta activada
    try {
      const reg = await models.Venta.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 } //Valor a actualizar
      );
      // Actualizar Stock
      let detalles = reg.detalles;
      detalles.map(function (x) {
        //Recorrer el array y trabajar cada objeto como x
        aumentarStock(x._id, x.cantidad);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  grafico12Meses: async (req, res, next) => {
    try {
      const reg = await models.Venta.aggregate([
        {
          $group: {
            //Propiedad de mongoose para agrupar
            _id: {
              mes: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            total: { $sum: "$total" },
            numero: { $sum: 1 },
          },
        },
        {
          $sort: {
            //Propiedad de mongoose para ordenar los registros una vez agrupados
            "_id.year": -1,
            "_id.mes": -1,
          },
        },
      ]).limit(12);
      
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
};
