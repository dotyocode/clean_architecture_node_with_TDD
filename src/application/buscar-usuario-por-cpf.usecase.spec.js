const { appError } = require("../shared/errors");
const buscarUsuarioPorCpfUseCase = require("./buscar-usuario-por-cpf.usecase");

const cpfDTO = {
  cpf: "1216571802",
};

const cpfOutputDTO = {
  nome_completo: "Jhonathan Peres",
  cpf: "1216571802",
  telefone: "31998571830",
  enedereco: "Rua helio de souza lima",
  email: "dotyomusic@gmail.com",
};

describe("Buscar usuario por CPF useCase", function () {
  const usuarioRepository = {
    buscarPorCpf: jest.fn(),
  };

  test("Deve retornar um usuario caso cpf esteja cadastrado", async function () {
    usuarioRepository.buscarPorCpf.mockResolvedValue(cpfOutputDTO);

    const sut = buscarUsuarioPorCpfUseCase({ usuarioRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toEqual(cpfOutputDTO);
    expect(usuarioRepository.buscarPorCpf).toHaveBeenCalledWith(cpfDTO.cpf);
    expect(usuarioRepository.buscarPorCpf).toHaveBeenCalledTimes(1);
  });

  test("Deve retornar null se não existir usuario com cpf informado", async function () {
    usuarioRepository.buscarPorCpf.mockResolvedValue(null);
    const sut = buscarUsuarioPorCpfUseCase({ usuarioRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toBeNull();
    expect(usuarioRepository.buscarPorCpf).toHaveBeenCalledWith(cpfDTO.cpf);
    expect(usuarioRepository.buscarPorCpf).toHaveBeenCalledTimes(1);
  });

  test("Deve retornar um throw appError se o usuarioRepository n for fornecido", async function () {
    expect(() => {
      buscarUsuarioPorCpfUseCase({});
    }).toThrow(new appError(appError.dependencias));
  });

  test("Deve retornar um throw appError se os campos obrigatorios não forem fornecidos", async function () {
    const sut = buscarUsuarioPorCpfUseCase({ usuarioRepository });

    await expect(() => sut({})).rejects.toThrow(
      new appError(appError.parametrosObrigatorios)
    );
  });
});
