const { Router } = require("express");

// armazena atalho em váriavel
const usersRouter = require("./users.routes");

const routes = Router();
// fala para o servidor seguir o caminho aramzenado em usersRouter
routes.use("/users", usersRouter);

module.exports = routes;