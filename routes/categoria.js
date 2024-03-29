import routerx from "express-promise-router";
import categoriaController from "../controllers/CategoriaController";
import auth from "../middlewares/auth";

const router = routerx();

//Rutas para todas las funciones de nuestro controlador categoriaController
//router.post("/add", auth.verifyAlmacenero, categoriaController.add);
router.post("/add", categoriaController.add);

router.get("/query", auth.verifyAlmacenero, categoriaController.query);
//router.get("/list", auth.verifyAlmacenero, categoriaController.list);
router.get("/list", categoriaController.list); //ruta temporal en lo que asigno accesos

router.put("/update", auth.verifyAlmacenero, categoriaController.update);
router.delete("/remove", auth.verifyAlmacenero, categoriaController.remove);
router.put("/activate", auth.verifyAlmacenero, categoriaController.activate);
router.put("/deactivate", auth.verifyAlmacenero, categoriaController.deactivate);

export default router;
