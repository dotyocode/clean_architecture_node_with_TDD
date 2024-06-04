const { Either, appError } = require("../shared/errors");

function buscarUsuarioPorCpfUseCase({ usuarioRepository }) {
  if (!usuarioRepository) {
    throw new appError(appError.dependencias);
  }
  return async function ({ cpf }) {
    
  const checkFields = cpf;

  if (!checkFields) throw new appError(appError.parametrosObrigatorios);
  
    const usuario = await usuarioRepository.buscarPorCpf(cpf);
    
    return Either.Right(usuario);
  };
}

module.exports = buscarUsuarioPorCpfUseCase;
  