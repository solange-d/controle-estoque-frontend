import * as React from 'react';
import { Delete, Edit, AddBusinessRounded } from '@mui/icons-material';
import { Paper, IconButton, Typography, Grid, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AlertDialog from '../../components/AlertDialog';
import { obterTodosFornecedores, excluirFornecedor } from '../../api/FornecedorService';
import Title from '../../components/Title';
import { Link as MuiLink } from 'react-router-dom';

function Fornecedores() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = async () => {
    try {
      const response = await obterTodosFornecedores();
      if (response && Array.isArray(response)) {
        const rowsWithId = response.map((row, index) => ({
          ...row,
          id: index + 1,
          fabricante: index % 2 === 0 ? 'sim' : 'não',
        }));
        setRows(rowsWithId);
      } else {
        console.error('A resposta da API não contém um array de dados');
      }
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'cnpj', headerName: 'CNPJ', width: 130 },
    { field: 'telefone', headerName: 'Telefone', width: 130 },
    { field: 'fabricante', headerName: 'Fabricante', width: 120 },
    {
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton component={MuiLink} to={`/editar-fornecedor/${params.row.idFornecedor}`}>
            <Edit fontSize="small" color="primary" />
          </IconButton>
          <IconButton onClick={() => handleExcluir(params.row)}>
            <Delete fontSize="small" color="error" />
          </IconButton>
          <IconButton component={MuiLink} to={`/enderecos-fornecedor/${params.row.idFornecedor}`}>
            <AddBusinessRounded fontSize="small" color="primary" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleExcluir = (row) => {
    setSelectedRow(row);
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleConfirmExcluir = async () => {
    try {
      await excluirFornecedor(selectedRow.idFornecedor);
      setRows((prevRows) => prevRows.filter((row) => row.idFornecedor !== selectedRow.idFornecedor));
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error.message);
      handleCloseDialog();
    }
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(searchText.toLowerCase()) ||
      row.cnpj.toLowerCase().includes(searchText.toLowerCase()) ||
      row.telefone.toLowerCase().includes(searchText.toLowerCase()) ||
      (row.fabricante && row.fabricante.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  return (
    <div>
      <Paper elevation={3} style={{ padding: '8px' }}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6">
              <MuiLink
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'gray',
                  fontSize: '12px',
                  cursor: 'pointer',
                  underline: 'hover',
                }}
              >
                Home
              </MuiLink>
            </Typography>
          </Grid>
          <Grid item>
            <Title>Fornecedores</Title>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={4}>
                <TextField
                  label="Pesquisar"
                  variant="outlined"
                  fullWidth
                  value={searchText}
                  onChange={handleSearchChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={MuiLink} to="/cadastrar-fornecedor" variant="contained" color="success" size="large">
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginTop: '8px' }}>
              <DataGrid key={rows.length} rows={filteredRows} columns={columns} pageSize={6} rowsPerPageOptions={[6]} />
            </div>
          </Grid>
        </Grid>
      </Paper>
      <AlertDialog open={openDialog} handleClose={handleCloseDialog} handleConfirmExcluir={handleConfirmExcluir} />
    </div>
  );
}

export default Fornecedores;