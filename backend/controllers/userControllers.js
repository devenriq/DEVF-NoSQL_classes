const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  //desestructuración de los datos del modelo(los datos dados por el usuario)
  const { name, email, password } = req.body;

  //se verificará que los datos estén completos:
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Faltan datos");
  }

  //verificar que el usuario no exista; ya que el email tiene que ser único
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("El usuario ya existe");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //se crea el usuario
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error(`Datos no validos`);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //desestructurar el req.body
  const { email, password } = req.body;

  //verificamos si el usuario existe
  const user = await User.findOne({ email });

  //si existe el usuario, se comprará el password con el hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error(`Credenciales incorrectas`);
  }

  res.json({
    mensaje: "Loguear Usuario",
  });
});

const perfilUser = asyncHandler(async (req, res) => {
  const { id, name, email } = req.user;

  res.status(200).json({
    name,
    email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  perfilUser,
};
