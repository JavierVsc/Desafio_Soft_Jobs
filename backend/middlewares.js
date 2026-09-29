require("dotenv").config();

const jwt = require("jsonwebtoken");

// Middleware 1: reportar consultas recibidas
const reportarConsulta = (req, res, next) => {
  const fecha = new Date().toLocaleString();

  console.log(`[${fecha}] ${req.method} ${req.originalUrl}`);

  next();
};

// Middleware 2: verificar existencia de credenciales
const verificarCredenciales = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email y password son obligatorios",
    });
  }

  next();
};

// Middleware 3: verificar y decodificar JWT
const verificarToken = (req, res, next) => {
  try {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({
        error: "Token no proporcionado",
      });
    }

    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token no válido",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const payload = jwt.decode(token);

    req.email = payload.email;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

module.exports = {
  reportarConsulta,
  verificarCredenciales,
  verificarToken,
};