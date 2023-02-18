import routerx from "express-promise-router";
import personaController from "../controllers/PersonaController";
import auth from "../middlewares/auth";

const router = routerx();

//Rutas para todas las funciones de nuestro controlador personaController
router.post("/add", auth.verifyUsuario, personaController.add);
router.get("/query", auth.verifyUsuario, personaController.query);
router.get("/list", auth.verifyUsuario, personaController.list);
router.get("/listClientes", auth.verifyUsuario, personaController.listClientes);
router.get("/listProveedores", auth.verifyUsuario, personaController.listProveedores);
router.put("/update", auth.verifyUsuario, personaController.update);
router.delete("/remove", auth.verifyUsuario, personaController.remove);
router.put("/activate", auth.verifyUsuario, personaController.activate);
router.put("/deactivate", auth.verifyUsuario, personaController.deactivate);

export default router;