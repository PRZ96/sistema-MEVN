import routerx from "express-promise-router";
import categoriaRouter from "./categoria";
import articuloRouter from "./articulo";
import usuarioRouter from "./usuario";

const router = routerx();

router.use("/categoria", categoriaRouter); //cuando router haga referencia a categoria que se haga referencia a categoriaRouter
router.use("/articulo", articuloRouter); //cuando router haga referencia a articulo que se haga referencia a articuloRouter
router.use("/usuario", usuarioRouter); //cuando router haga referencia a usuario que se haga referencia a usuarioRouter

export default router;
