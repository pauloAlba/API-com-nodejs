// importa o Router do modulo express
const { Router } = require("express");

// coloca caminho do usersController em uma váriavel
const TagsController = require("../controllers/TagsController");
// Inicializa o router
const tagsRoutes = Router();

const tagsController = new TagsController();

// Rota, neste caso é a pasta raiz "/"
// Função que extrai duas informações, request (requisição feita) e response, que é o recurso utilizado
// para fazer a resposta
tagsRoutes.get("/:user_id", tagsController.index);


// exportando o arquivo para quem quiser utilizar
module.exports = tagsRoutes;
