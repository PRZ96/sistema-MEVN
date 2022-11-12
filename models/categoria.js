import mongoose, { Schema } from "mongoose";

const categoriaSchema = new Schema({
  nombre: { type: String, maxlenght: 50, unique: true, required: true },
  descripcion: { type: String, maxlenght: 255 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Categoria = mongoose.model('categoria', categoriaSchema); // Hacemos que mongoose convierta Categoria en un modelo llamado categoria y tome como base categoriaSchema

export default Categoria; //exportamos el modelo