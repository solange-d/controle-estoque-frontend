import { BASE_URL } from './DefaulUrl';

  export async function obterTodosFornecedores(){
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
