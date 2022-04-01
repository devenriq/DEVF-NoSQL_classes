const asyncHandler = require("express-async-handler");
const Tarea = require("../models/tareaModel");

const getTareas = asyncHandler(async (req, res) => {
  const tareas = await Tarea.find();
  res.status(200).json(tareas);
});

const postTareas = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // res.status(400).json({ message: "Por favor, ingrese algún valor" });
    res.status(400);
    throw new Error("Por favor, teclea una tarea");
  }
  const tarea = await Tarea.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(tarea);
});

const putTareas = asyncHandler(async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);

  if (!tarea) {
    res.status(400);
    throw new Error(`No se encontró la tarea ingresada`);
  }

  const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(tareaUpdated);
});

const deleteTareas = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Eliminar la Tarea ${req.params.id}` });
});

module.exports = {
  getTareas,
  putTareas,
  postTareas,
  deleteTareas,
};
