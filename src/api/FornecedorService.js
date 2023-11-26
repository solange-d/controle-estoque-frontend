import { BASE_URL } from './DefaulUrl';

export async function obterFornecedorPorId(idFornecedor) {
  try {
    const response = await fetch(`${BASE_URL}fornecedor/${idFornecedor}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter fornecedor por ID: ${response.statusText}`);
    }

    const fornecedor = await response.json();
    return fornecedor;
  } catch (error) {
    console.error('Erro na função obterFornecedorPorId:', error);
    throw error;
  }
}

export async function obterTodosFornecedores() {
  const response = await fetch(`${BASE_URL}fornecedor/fornecedores`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function cadastrarFornecedor(novoFornecedor) {
  const response = await fetch(`${BASE_URL}fornecedor`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoFornecedor),
  });
  const result = await response.json();
  return result;
}

export async function excluirFornecedor(idFornecedor) {
  try {
    const response = await fetch(`${BASE_URL}fornecedor/${idFornecedor}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir fornecedor: ${response.statusText}`);
    }

    const responseBody = await response.text();
    const result = responseBody ? JSON.parse(responseBody) : null;

    return result;
  } catch (error) {
    console.error('Erro na função excluirFornecedor:', error);
    throw error;
  }
}

export async function atualizarFornecedor(idFornecedor, dadosAtualizados) {
  try {
    const response = await fetch(`${BASE_URL}fornecedor/${idFornecedor}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar fornecedor: ${response.statusText}`);
    }

    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error('Erro na função atualizarFornecedor:', error);
    throw error;
  }
}

