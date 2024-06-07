const { appError, Either } = require("../shared/errors");
const cadastrarLivrosUseCase = require("./cadastrar-livros.usecase");

const userMock = {
    autor: "John",
    genero: "RPG",
    isbn: "3121-231-g",
    nome: "Ragnarok",
    quantidade: "10",
};

describe("Cadastrar livros useCase", function () {
  const livrosRepository = {
    cadastrar: jest.fn(),
    valorJaCadastrado: jest.fn(),
    existePorIsbn: jest.fn(),
  };

  test("Deve poder cadastrar um livro", async function () {
    const livrosDTO = userMock;

    const sut = cadastrarLivrosUseCase({ livrosRepository });
    const output = await sut(livrosDTO);

    expect(output.right).toBeNull();
    expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livrosDTO);
    expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test("Deve retornar um throw appError se o livrosRepository n for fornecido", async function () {
    expect(() => {
      cadastrarLivrosUseCase({});
    }).toThrow(new appError(appError.dependencias));
  });

  test("Deve retornar um throw appError se os campos obrigatorios não forem fornecidos", async function () {
    const sut = cadastrarLivrosUseCase({ livrosRepository });

    await expect(() => sut({})).rejects.toThrow(
      new appError(appError.parametrosObrigatorios)
    );
  });

  test("Deve retornar um Either.left.valorJaCadastrado se existir um ISBN já cadastrado para um livro", async function () {
    livrosRepository.existePorIsbn.mockResolvedValue(true);
    const livrosDTO = userMock;

    const sut = cadastrarLivrosUseCase({ livrosRepository });
    const output = await sut(livrosDTO);

    expect(output.left).toEqual(Either.valueRegister("isbn"));
    expect(livrosRepository.existePorIsbn).toHaveBeenCalledWith(livrosDTO.isbn);
    expect(livrosRepository.existePorIsbn).toHaveBeenCalledTimes(1);
  });

});
