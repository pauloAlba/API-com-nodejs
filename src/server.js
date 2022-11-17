// pega todas as funcionalidades do modulo express localiado em node_module
// s e armazena na variavel express
require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/appError");
const express = require("express");
const routes = require("./routes");

migrationsRun();

// inicializa o express 
const app = express();

// informa apra o node qual é o padrão utilizado para receber as informações através do corpo da requisição
app.use(express.json());

app.use(routes);



// error, captura erro da requisição(require) e devolve uma resposta(response) de acordo com o tipo de erro
// next, permite avançar para uma proxima etapa
app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  };

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error"
  });
});

// variavel que armazena a porta do servidor
const PORT = 3333;
// faz com que o app inicie na porta 3333 e envie uma mensagem de confirmação
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));



