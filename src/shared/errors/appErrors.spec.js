const AppError = require("./appErros");

describe("AppError", function () {
  test("Checando se o AppError é uma instancia de erro", function () {
    const appError = new AppError("error");
    expect(appError).toBeInstanceOf(Error);
  });

  test("Checando se msg está correta AppError", function () {
    const mensagem = "Mensagem de erro";
    const appError = new AppError(mensagem);

    expect(appError.message).toBe(mensagem)
  });
});
