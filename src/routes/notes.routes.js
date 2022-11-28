// importa o Router do modulo express
const { Router } = require("express");

// coloca caminho do usersController em uma váriavel
const NotesController = require("../controllers/notesController");
// Inicializa o router
const notesRoutes = Router();

const notesController = new NotesController();

// Rota, neste caso é a pasta raiz "/"
// Função que extrai duas informações, request (requisição feita) e response, que é o recurso utilizado
// para fazer a resposta
notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

// exportando o arquivo para quem quiser utilizar
module.exports = notesRoutes;
