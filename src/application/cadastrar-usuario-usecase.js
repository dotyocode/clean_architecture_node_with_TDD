// src/application/cadastrar-usuario-usecase.js
const { Either } = require("../shared/errors");
const { appError } = require("../shared/errors");

function cadastrarUsuarioUseCase({ usuarioRepository }) {
  if (!usuarioRepository) {
    throw new appError(appError.dependencias);
  }

  return async function ({ nome_completo, cpf, telefone, enedereco, email }) {
    const checkFields = nome_completo && cpf && telefone && enedereco && email;

    if (!checkFields) throw new appError(appError.parametrosObrigatorios);

    const checkExistUserWithSimilarCPF = await usuarioRepository.existCPF(cpf);

    if (checkExistUserWithSimilarCPF) return Either.Left(Either.valueRegister('cpf'));

    const checkExistUserWithSimilarEmail = await usuarioRepository.existEmail(email);

    if (checkExistUserWithSimilarEmail) return Either.Left(Either.valueRegister('Email'));

    await usuarioRepository.cadastrar({
      nome_completo,
      cpf,
      telefone,
      enedereco,
      email,
    });

    return Either.Right(null);
  };
}

module.exports = cadastrarUsuarioUseCase;
