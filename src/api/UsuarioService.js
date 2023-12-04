import { BASE_URL } from './DefaulUrl';

export async function getUsuarioAutenticado(usuario) {
  
  const credentials = {
    email: usuario.email,
    senha: usuario.senha
  }

  try {
    const response = await fetch(`${BASE_URL}usuario/email/${credentials.email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    var responseTratada = await response.json()
    
    if(responseTratada.senha == credentials.senha) {
      return responseTratada;
    }
    return false;

  } catch (error) {
    console.error('Erro na função validateUserCredentials:', error);
    throw error;
  }

}