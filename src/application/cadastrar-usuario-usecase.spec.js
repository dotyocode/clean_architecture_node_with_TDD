const { appError, Either } = require("../shared/errors");
const cadastrarUsuarioUsecase = require("./cadastrar-usuario.usecase");

const userMock = {
  nome_completo: "Jhonathan Peres",
  cpf: "12165718021",
  telefone: "31998571830",
  enedereco: "Rua helio de souza lima",
  email: "dotyomusic@gmail.com",
};

describe("Cadastrar usuario useCase", function () {
  const usuarioRepository = {
    cadastrar: jest.fn(),
    existCPF: jest.fn(),
    existEmail: jest.fn(),
  };

  test("Deve poder cadastrar um usuario", async function () {
    const usuarioDTO = userMock;

    const sut = cadastrarUsuarioUsecase({ usuarioRepository });
    const output = await sut(usuarioDTO);

    expect(output.right).toBeNull();
    expect(usuarioRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
    expect(usuarioRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test("Deve retornar um throw appError se o usuarioRepository n for fornecido", async function () {
    expect(() => {
      cadastrarUsuarioUsecase({});
    }).toThrow(new appError(appError.dependencias));
  });

  test("Deve retornar um throw appError se os campos obrigatorios não forem fornecidos", async function () {
    const sut = cadastrarUsuarioUsecase({ usuarioRepository });

    await expect(() => sut({})).rejects.toThrow(
      new appError(appError.parametrosObrigatorios)
    );
  });

  test("Deve retornar um throw appError se cpf já existir", async function () {
    usuarioRepository.existCPF.mockResolvedValue(true);
    const usuarioDTO = userMock;

    const sut = cadastrarUsuarioUsecase({ usuarioRepository });
    const output = await sut(usuarioDTO);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueRegister("cpf"));
    expect(usuarioRepository.existCPF).toHaveBeenCalledWith(usuarioDTO.cpf);
    expect(usuarioRepository.existCPF).toHaveBeenCalledTimes(1);
  });

  test("Deve retornar um throw appError se email já existir", async function () {
    usuarioRepository.existCPF.mockResolvedValue(false);
    usuarioRepository.existEmail.mockResolvedValue(true);
    const usuarioDTO = userMock;

    const sut = cadastrarUsuarioUsecase({ usuarioRepository });
    const output = await sut(usuarioDTO);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueRegister("Email"));
    expect(usuarioRepository.existEmail).toHaveBeenCalledWith(usuarioDTO.email);
    expect(usuarioRepository.existEmail).toHaveBeenCalledTimes(1);
  });
});
