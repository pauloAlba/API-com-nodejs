const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/appError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  // Cria usuário no banco de dados
  async create(request, response) {
    const { name, email, password } = request.body; // recebe dados do usuário

    const database = await sqliteConnection(); // realiza a conexão com o banco de dados
    const checkUserExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    ); // verifica se o email do usuário existe
    if (checkUserExist) {
      // verifica se o email do usuario existe e faz algo
      throw new AppError("Este e-mail já está  em uso"); // caso exista
    }

    const hashedPassword = await hash(password, 8); // senha e salt(fator de complexidade do hash)

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json(); // caso não exista
  }
  // Atualiza usuário no banco de dados
  async update(request, response) {
    const { name, email, password, old_password } = request.body; // pega o nome e email do corpo da requisição
    const { id } = request.params; // pega o id de params

    const database = await sqliteConnection(); // cria conexão com o banco de dados
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]); // procura id que seja igual ao id que veio da requisição
    if (!user) {
      // caso o usuário não exista, mostre mensagem de erro
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      // se eu tentar atualizar o meu email sendo que já está sendo utilizado por outra pessoa
      throw new AppError("Este email já está em uso.");
    }

    user.name = name ?? user.name; // adiciona o novo nome recebido pela requisição e verifica se existe conteudo dentro de nome (?? user.name)
    user.email = email ?? user.email; // adiciona o novo email recebido pela requisição e verifica se existe conteudo dentro de email (?? user.name)

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE users SET
     name = ?,
     email = ?,
     password = ?,
     updated_at = DATETIME('now')
     WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return response.status(201).json(); // caso não exista
  }
  /**
   * index - GET para listar vários registros.
   * show - GET para exibir um registro especifico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */
}

module.exports = UsersController;
