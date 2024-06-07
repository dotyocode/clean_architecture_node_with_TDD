## reunião

somos uma biblioteca pequena e gostariamos de controlar nossa entrada e saida de livros. queremos cadastrar o usuario
que vai pegar o livro emprestado o livro da biblioteca, cadastrar os livros da nossa bilbioteca e poder emprestar os
livros para qualquer usuario, alem de buscar os registros de emprestimos.


## Dados

- Usuario: {nome_completo, cpf, telefone, enedereco, email}
- Livro: {nome, quantidade, autor, genero, isbn} (ISBN = Código unico do livro seria o uiid)
- Emprestimo: {usuario_id, livro_id, data_retorno, data_devolucao, data_saida}

## UseCases (Regra de négocio)

- Cadastrar um novo usuario [CHECKED]
  - CPF ou emails devem ser unicos [CHECKED]

- Buscar um cadastro de usuario por CPF [CHECKED]
  - retornar um usuario ou vazio [CHECKED]

- Cadastrar um novo livro [CHECKED]
  - ISBN deve ser unico [CHECKED]

- Buscar um livro por nome ou ISBN
  - retornar um livro ou vazio

- Emprestar um livro ao usuario
  - a data de retorno n pode ser menor que a data de saida
  - um usuario não pode está com mais de um livro com o mesmo ISBN ao mesmo tempo
  - um usuario pode esta com mais de um lviro com ISB diferente ao mesmo tempo
  - ao cadastrar um emprestimo, sera enviado um email automaticamente informando o nome do livro, nome do usuario, CPF
  data de saida e a data de retorno
  
- Devolver o livro emprestado
  - Caso o usuario tenha atrasado, sera gerada uma multa fixa de R$10.00

- Mostrar todos os emprestimos pendentes, com o nome do livro, nome do usuario, cpf, data de saida e data de retorno. Ordenados pela data de retorno mais antiga


## usuarioRepository
- cadastrar: {nome_completo, cpf, telefone, enedereco, email} => retornar Promise<void>