import routerx from "express-promise-router";
import usuarioController from "../controllers/UsuarioController";

const router = routerx();

//Rutas para todas las funciones de nuestro controlador usuarioController
router.post("/add", usuarioController.add);
router.get("/query", usuarioController.query);
router.get("/list", usuarioController.list);
router.put("/update", usuarioController.update);
router.delete("/remove", usuarioController.remove);
router.put("/activate", usuarioController.activate);
router.put("/deactivate", usuarioController.deactivate);

export default router;