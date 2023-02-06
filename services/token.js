import jwt from "jsonwebtoken";
import models from "../models";

async function checkToken(token) {
  //Función que revisa que el token sea valido aunque sea un token antiguo
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    return false;
  }
  const user = await models.Usuario.findOne({ _id: __id, estado: 1 });
  if (user) {
    const token = jwt.sign({ _id: __id }, "clavesecretaparagenerartoken", { expiresIn: "1d" });
    return { token, rol: user.rol };
  } else {
    return false;
  }
}

export default {
  encode: async (_id) => {
    //Función para generar el token
    const token = jwt.sign({ _id: _id }, "clavesecretaparagenerartoken", { expiresIn: "1d" }); //genera el token
    return token;
  },
  decode: async (token) => {
    // Función para verificar si el token es correcto
    try {
      const { _id } = await jwt.verify(token, "clavesecretaparagenerartoken"); //verifica el token
      const user = await models.Usuario.findOne({ _id, estado: 1 });
      //Si se encuentra el usuario
      if (user) {
        return user;
      }
      else {
        return false;
      }
    } catch (e) {
        const newToken = await checkToken(token);
        return newToken;
    }
  },
};
