import routerx from "express-promise-router";
import articuloController from "../controllers/ArticuloController";
import auth from "../middlewares/auth";

const router = routerx();

//Rutas para todas las funciones de nuestro controlador articuloController 
router.post("/add", auth.verifyAlmacenero, articuloController.add);
router.get("/query", auth.verifyAlmacenero, articuloController.query);
router.get("/queryCodigo", auth.verifyUsuario, articuloController.queryCodigo);
router.get("/list", auth.verifyAlmacenero, articuloController.list);
router.put("/update", auth.verifyAlmacenero, articuloController.update);
router.delete("/remove", auth.verifyAlmacenero, articuloController.remove);
router.put("/activate", auth.verifyAlmacenero, articuloController.activate);
router.put("/deactivate", auth.verifyAlmacenero, articuloController.deactivate);

export default router;
