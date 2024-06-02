const AppError = require("../shared/errors/appErros");

module.exports = function cadastrarUsuarioUseCase({ usuarioRepository }) {
  if (!usuarioRepository) {
    throw new AppError(AppError.dependencias);
  }
  
  return async function ({ nome_completo, cpf, telefone, enedereco, email }) {
    const checkFields = nome_completo && cpf && telefone && enedereco && email

    if(!checkFields) throw new AppError(AppError.parametrosObrigatorios)

    await usuarioRepository.cadastrar({
      nome_completo,
      cpf,
      telefone,
      enedereco,
      email,
    });
  };
};
