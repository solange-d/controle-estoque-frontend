import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../view/dashboard/Dashboard';
import Fornecedores from '../view/fornecedor/Fornecedores';
import CadastrarFornecedor from '../view/fornecedor/CadastrarFornecedor';
import EditarFornecedor from '../view/fornecedor/EditarFornecedor'; 
import EnderecosFornecedor from '../view/fornecedor/EnderecosFornecedor'; 
import CadastrarEnderecoFornecedor from '../view/fornecedor/CadastrarEnderecoFornecedor'; 
import EditarEnderecoFornecedor from '../view/fornecedor/EditarEnderecoFornecedor'; 
import CadastroUsuario from '../view/usuario/Usuarios';
import Produtos from '../view/produto/Produtos';
import CadastrarProduto from '../view/produto/CadastrarProduto';
import EditarProduto from '../view/produto/EditarProduto';
import { Relatorio } from '../view/relatorio';

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
      <Route path="/editar-fornecedor/:idFornecedor" element={<EditarFornecedor />} />
      <Route path="/editar-endereco/:idFornecedor/:idEndereco" element={<EditarEnderecoFornecedor />} />
      <Route path="/cadastrar-endereco/:idFornecedor" element={<CadastrarEnderecoFornecedor />} /> 
      <Route path="/enderecos-fornecedor/:idFornecedor" element={<EnderecosFornecedor />} />
      <Route path="/usuario" element={<CadastroUsuario />} />
      <Route path="/produto" element={<Produtos/>} />
      <Route path="/cadastrar-produto" element={<CadastrarProduto/>} />
      <Route path="/editar-produto/:idProduto" element={<EditarProduto/>} />
      <Route path="/relatorio" element={<Relatorio />} />
    </Routes>
  );
}

export default Rotas;
