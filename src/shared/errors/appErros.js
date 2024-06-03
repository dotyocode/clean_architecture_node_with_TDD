class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AppError';
  }

  static dependencias = 'Dependências não fornecidas';
  static parametrosObrigatorios = 'Parâmetros obrigatórios não fornecidos';
  static cpfExiste = 'CPF já existe';
}

module.exports = AppError;