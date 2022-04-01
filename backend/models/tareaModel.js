const mongoose = require("mongoose");

const tareaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    text: {
      type: "string",
      required: [true, "Por favor, escribe un texto"],
    },
  },
  {
    timestamps: true, // esto es para para que cada vez que se cree un nuevo documento, se creen dos campos: created at y updated at; además del ID, que será puesto por default
  }
);

module.exports = mongoose.model("Tarea", tareaSchema);
