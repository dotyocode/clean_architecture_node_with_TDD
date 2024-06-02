const AppError = require("../shared/errors/appErros");
const cadastrarUsuarioUsecase = require("./cadastrar-usuario-usecase");

describe("Cadastrar usuario useCase", function () {
  const usuarioRepository = {
    cadastrar: jest.fn(),
  };

  test("Deve poder cadastrar um usuario", async function () {
    const usuarioDTO = {
      nome_completo: "Jhonathan Peres",
      cpf: "12165718021",
      telefone: "31998571830",
      enedereco: "Rua helio de souza lima",
      email: "dotyomusic@gmail.com",
    };

    const sut = cadastrarUsuarioUsecase({ usuarioRepository });
    const output = await sut(usuarioDTO);

    expect(output).toBeUndefined();
    expect(usuarioRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
    expect(usuarioRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test("Deve retornar um throw AppError se o usuarioRepository n for fornecido", async function () {
    expect(() => {
      cadastrarUsuarioUsecase({});
    }).toThrow(new AppError(AppError.dependencias));
  });

  test("Deve retornar um throw AppError se os campos obrigatorios não forem fornecidos", async function () {
    const sut = cadastrarUsuarioUsecase({ usuarioRepository });

    await expect(() => sut({})).rejects.toThrow(new AppError(AppError.parametrosObrigatorios));
  });
});
