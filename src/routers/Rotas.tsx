import React from 'react';
import { Route, Routes } from 'react-router-dom';



import Dashboard from '../view/dashboard/Dashboard';
import Fornecedores from '../view/fornecedor/Fornecedores';
import CadastrarFornecedor from '../view/fornecedor/CadastrarFornecedor';
import CadastroUsuario from '../view/usuario/Usuarios';
import CadastroProduto from '../view/produto/Produtos';


function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
      <Route path="/usuario" element={<CadastroUsuario />} />
      <Route path="/produto" element={<CadastroProduto/>} />
    </Routes>
  );
}

export default Rotas;
