import routerx from "express-promise-router";
import categoriaRouter from "./categoria";
import articuloRouter from "./articulo";
import usuarioRouter from "./usuario";
import personaRouter from "./persona";
import ingresoRouter from "./ingreso";
import ventaRouter from "./venta";

const router = routerx();

router.use("/categoria", categoriaRouter); //cuando router haga referencia a categoria que se haga referencia a categoriaRouter
router.use("/articulo", articuloRouter); //cuando router haga referencia a articulo que se haga referencia a articuloRouter
router.use("/usuario", usuarioRouter); //cuando router haga referencia a usuario que se haga referencia a usuarioRouter
router.use("/persona", personaRouter); //cuando router haga referencia a persona que se haga referencia a personaRouter
router.use("/ingreso", ingresoRouter); //cuando router haga referencia a ingreso que se haga referencia a ingresoRouter
router.use("/venta", ventaRouter); //cuando router haga referencia a ingreso que se haga referencia a ventaRouter

export default router;
