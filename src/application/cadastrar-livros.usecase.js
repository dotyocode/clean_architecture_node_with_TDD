const { Either, appError } = require("../shared/errors");

function cadastrarLivrosUseCase({ livrosRepository }) {
  if (!livrosRepository) {
    throw new appError(appError.dependencias);
  }

  return async function ({ nome, quantidade, autor, genero, isbn }) {
    const checkFields = nome && quantidade && autor && genero && isbn;

    if (!checkFields) throw new appError(appError.parametrosObrigatorios);

    const checkExistISBN = await livrosRepository.existePorIsbn(isbn);
    if (checkExistISBN) return Either.Left(Either.valueRegister("isbn"));

    await livrosRepository.cadastrar({ nome, quantidade, autor, genero, isbn });
    return Either.Right(null);
  };
}

module.exports = cadastrarLivrosUseCase;
