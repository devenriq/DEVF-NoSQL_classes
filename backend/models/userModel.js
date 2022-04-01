const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Ingresa un nombre, por favor"],
    },
    email: {
      type: "string",
      required: [true, "Ingresa un correo, por favor"],
      unique: true,
    },
    password: {
      type: "string",
      require: [true, "Ingresa una contraseña, por favor"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
