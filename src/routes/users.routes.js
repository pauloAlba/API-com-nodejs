// importa o Router do modulo express
const { Router } = require("express");

// coloca caminho do usersController em uma váriavel
const UsersController = require("../controllers/usersController");
// Inicializa o router
const usersRoutes = Router();

const usersController = new UsersController();

// Rota, neste caso é a pasta raiz "/"
// Função que extrai duas informações, request (requisição feita) e response, que é o recurso utilizado
// para fazer a resposta
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

// exportando o arquivo para quem quiser utilizar
module.exports = usersRoutes;
