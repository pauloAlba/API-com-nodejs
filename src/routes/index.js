const { Router } = require("express");

// armazena atalho em váriavel
const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();
// fala para o servidor seguir o caminho aramzenado em usersRouter
routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;