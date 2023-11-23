import * as React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Paper, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AlertDialog from '../../components/AlertDialog';

function CadastroUsuario() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rows, setRows] = React.useState([
    { id: 1, nome: 'Nome 1', email: 'Email 1', cnpj: 'Cnpj 1', telefone: 'Telefone 1' },
    { id: 2, nome: 'Nome 2', email: 'Email 2', cnpj: 'Cnpj 2', telefone: 'Telefone 2' },
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'cnpj', headerName: 'CNPJ', width: 130 },
    { field: 'telefone', headerName: 'Telefone', width: 130 },
    {
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditar(params.row)}>
            <Edit fontSize="small" color="primary" />
          </IconButton>
          <IconButton onClick={() => handleExcluir(params.row)}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleEditar = (row) => {
    // Implemente a lógica para editar o registro com o ID fornecido
    console.log(`Editar o registro com o ID: ${row.id}`);
  };

  const handleExcluir = (row) => {
    // Define a linha selecionada para a lógica de exclusão posterior
    setSelectedRow(row);
    // Abre o diálogo de confirmação
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null); // Limpa a linha selecionada
  };

  const handleConfirmExcluir = () => {
    // Implemente a lógica para excluir o registro com o ID fornecido
    console.log(`Excluir o registro com o ID: ${selectedRow.id}`);
    // Atualiza o estado de rows removendo o item excluído
    setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow.id));
    // Fecha o diálogo
    handleCloseDialog();
  };

  return (
    <div>
      <Paper elevation={3}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
      {/* Componente AlertDialog */}
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleConfirmExcluir={handleConfirmExcluir}
      />
    </div>
  );
}

export default CadastroUsuario;
