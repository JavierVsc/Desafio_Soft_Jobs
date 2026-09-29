require("dotenv").config();

const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  allowExitOnIdle: true,
});

const registrarUsuario = async ({ email, password, rol, lenguage }) => {
  const passwordEncriptada = bcrypt.hashSync(password, 10);

  const consulta = `
    INSERT INTO usuarios
    VALUES (DEFAULT, $1, $2, $3, $4)
    RETURNING id, email, rol, lenguage
  `;

  const values = [email, passwordEncriptada, rol, lenguage];

  const { rows } = await pool.query(consulta, values);

  return rows[0];
};

const obtenerUsuarioPorEmail = async (email) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];

  const { rows } = await pool.query(consulta, values);

  return rows;
};

const verificarCredenciales = async (email, password) => {
  const usuarios = await obtenerUsuarioPorEmail(email);

  if (usuarios.length === 0) {
    return false;
  }

  const usuario = usuarios[0];

  const passwordCorrecta = bcrypt.compareSync(
    password,
    usuario.password
  );

  if (!passwordCorrecta) {
    return false;
  }

  return usuario;
};

module.exports = {
  registrarUsuario,
  obtenerUsuarioPorEmail,
  verificarCredenciales,
};