import { BASE_URL } from './DefaulUrl';

export async function cadastrarEnderecoFornecedor(idFornecedor, novoEndereco) {
  try {
    const response = await fetch(`${BASE_URL}endereco/fornecedor/${idFornecedor}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoEndereco),
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar endereço do fornecedor: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro na função cadastrarEnderecoFornecedor:', error);
    throw error;
  }
}

export async function obterEnderecosFornecedor(idFornecedor) {
  const response = await fetch(`${BASE_URL}endereco/fornecedor/${idFornecedor}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
}

export async function obterEndereco(idEndereco) {
  const response = await fetch(`${BASE_URL}endereco/${idEndereco}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao obter endereço: ${response.statusText}`);
  }

  const endereco = await response.json();
  return endereco;
}

export async function atualizarEnderecoFornecedor(idFornecedor, idEndereco, dadosAtualizados) {
  try {
    const response = await fetch(`${BASE_URL}endereco/fornecedor/${idFornecedor}/${idEndereco}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar endereço do fornecedor: ${response.statusText}`);
    }

    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error('Erro na função atualizarEnderecoFornecedor:', error);
    throw error;
  }
} 

export async function excluirEnderecoFornecedor(idFornecedor, idEndereco) {
  try {
    const response = await fetch(`${BASE_URL}endereco/fornecedor/${idFornecedor}/${idEndereco}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir endereço do fornecedor: ${response.statusText}`);
    }

    const responseBody = await response.text();
    const result = responseBody ? JSON.parse(responseBody) : null;

    return result;
  } catch (error) {
    console.error('Erro na função excluirEnderecoFornecedor:', error);
    throw error;
  }
}
