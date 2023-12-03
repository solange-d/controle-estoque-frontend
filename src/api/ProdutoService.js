import { BASE_URL } from './DefaulUrl';

export async function cadastrarProduto(idFornecedor, novoProduto) {
  try {
    const response = await fetch(`${BASE_URL}produto/${idFornecedor}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoProduto),
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar produto: ${response.statusText}`);
    }

    const produtoId = await response.json();
    return produtoId;
  } catch (error) {
    console.error('Erro na função cadastrarProduto:', error);
    throw error;
  }
}

export async function obterTodosProdutosFornecedor(idFornecedor) {
  try {
    const response = await fetch(`${BASE_URL}produto/todos/${idFornecedor}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter todos os produtos: ${response.statusText}`);
    }

    const produtos = await response.json();
    return produtos;
  } catch (error) {
    console.error('Erro na função obterTodosProdutos:', error);
    throw error;
  }
}

export async function obterTodosProdutos() {
  try {
    const response = await fetch(`${BASE_URL}produto/lista-produtos`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter todos os produtos: ${response.statusText}`);
    }

    const produtos = await response.json();
    return produtos;
  } catch (error) {
    console.error('Erro na função obterTodosProdutos:', error);
    throw error;
  }
}

export async function obterProdutoPorId(idProduto) {
  try {
    const response = await fetch(`${BASE_URL}produto/${idProduto}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter produto por ID: ${response.statusText}`);
    }

    const produto = await response.json();
    return produto;
  } catch (error) {
    console.error('Erro na função obterProdutoPorId:', error);
    throw error;
  }
}

export async function atualizarProduto(idFornecedor, idProduto, dadosAtualizados) {
  try {
    const response = await fetch(`${BASE_URL}produto/fornecedor/${idFornecedor}/produto/${idProduto}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar produto: ${response.statusText}`);
    }

    const produtoAtualizado = await response.json();
    return produtoAtualizado;
  } catch (error) {
    console.error('Erro na função atualizarProduto:', error);
    throw error;
  }
}

export async function excluirProduto(idProduto, idFornecedor) {
  try {
    const response = await fetch(`${BASE_URL}produto/fornecedor/${idFornecedor}/produto/${idProduto}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir produto: ${response.statusText}`);
    }

    const responseBody = await response.text();
    const result = responseBody ? JSON.parse(responseBody) : null;

    return result;
  } catch (error) {
    console.error('Erro na função excluirProduto:', error);
    throw error;
  }
}
