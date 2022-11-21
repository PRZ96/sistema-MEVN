import routerx from "express-promise-router";
import CategoriaController from "../controllers/CategoriaController";

const router = routerx();

//Rutas para todas las funciones de nuestro controlador CategoriaController
router.post("/add", CategoriaController.add);
router.get("/query", CategoriaController.query);
router.get("/list", CategoriaController.list);
router.put("/update", CategoriaController.update);
router.delete("/remove", CategoriaController.remove);
router.put("/activave", CategoriaController.activate);
router.put("/deactivate", CategoriaController.deactivate);

export default router;
