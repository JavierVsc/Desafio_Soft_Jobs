require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {
  registrarUsuario,
  obtenerUsuarioPorEmail,
  verificarCredenciales: validarUsuario,
} = require("./consultas");

const {
  reportarConsulta,
  verificarCredenciales,
  verificarToken,
} = require("./middlewares");

const app = express();

app.use(cors());
app.use(express.json());

app.use(reportarConsulta);

// Registrar usuario
app.post("/usuarios", verificarCredenciales, async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    const usuario = await registrarUsuario({
      email,
      password,
      rol,
      lenguage,
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error al registrar el usuario",
    });
  }
});

// Iniciar sesión
app.post("/login", verificarCredenciales, async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await validarUsuario(email, password);

    if (!usuario) {
      return res.status(401).json({
        error: "Email o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      { email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error al iniciar sesión",
    });
  }
});

// Obtener datos del usuario autenticado
app.get("/usuarios", verificarToken, async (req, res) => {
  try {
    const usuarios = await obtenerUsuarioPorEmail(req.email);

    res.json(usuarios);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error al obtener el usuario",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor encendido en http://localhost:3000");
});