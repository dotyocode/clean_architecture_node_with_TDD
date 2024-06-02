function calcularTotalPedido(precoUnitario, quantidade) {
  return precoUnitario * quantidade;
}

const totalPedido = calcularTotalPedido(10, 20);

function calcularTotal({ precoUnitario, quantidade }) {
  return precoUnitario * quantidade;
}

const total = calcularTotal({ precoUnitario: 20, quantidade: 10 });


const pedidoDTO = {
    precoUnitario: 20,
    quantidade: 3
}

const total3 = calcularTotal(pedidoDTO);
