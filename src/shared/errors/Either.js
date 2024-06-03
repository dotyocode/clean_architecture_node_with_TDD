/*
 * @description: Atenção essa classe não deve ser instanciada diretamente, use um dos metodos Right ou Left
*/
class Either {
    constructor(left, right) {
      this.left = left;
      this.right = right;
    }
  
    static Left(left) {
      return new Either(left, null);
    }
  
    static Right(right) {
      return new Either(null, right);
    }

    static valueRegister(value) {
      return {message: `${value} já cadastrado`}
    }
  }
  
  module.exports = Either;