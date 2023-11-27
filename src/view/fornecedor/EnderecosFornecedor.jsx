import React, { useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Paper, IconButton, Typography, Grid, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link as MuiLink, useNavigate, useParams } from 'react-router-dom';
import { obterEnderecosFornecedor, excluirEnderecoFornecedor } from '../../api/EnderecoService';
import AlertDialog from '../../components/AlertDialog';
import Title from '../../components/Title';

function EnderecosFornecedor() {
  const { idFornecedor } = useParams(); 
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    carregarEnderecos();
  }, [idFornecedor]);

  const carregarEnderecos = async () => {
    try {
      const response = await obterEnderecosFornecedor(idFornecedor);

      if (response && Array.isArray(response)) {
        const rowsWithId = response.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowsWithId);
      } else {
        console.error('A resposta da API não contém um array de dados');
      }
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
    }
  };

  const handleEditar = (enderecoId) => {
    navigate(`/editar-endereco/${enderecoId}`);
  };

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

  const handleConfirmExcluir = async () => {
    try {
      if (selectedRow) {
        await excluirEnderecoFornecedor(idFornecedor, selectedRow.idEndereco);
        setRows((prevRows) => prevRows.filter((row) => row.idEndereco !== selectedRow.idEndereco));
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Erro ao excluir endereço:', error.message);
    }
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'logradouro', headerName: 'Logradouro', width: 230 },
    { field: 'numero', headerName: 'Número', width: 130 },
    { field: 'bairro', headerName: 'Bairro', width: 130 },
    { field: 'municipio', headerName: 'Município', width: 130 },
    { field: 'estado', headerName: 'Estado', width: 130 },
    { field: 'cep', headerName: 'CEP', width: 130 },
    {
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton component={MuiLink} to={`/editar-endereco/${idFornecedor}/${params.row.idEndereco}`}>
            <Edit fontSize="small" color="primary" />
          </IconButton>
          <IconButton onClick={() => handleExcluir(params.row)}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.logradouro.toLowerCase().includes(searchText.toLowerCase()) ||
      row.numero.toLowerCase().includes(searchText.toLowerCase()) ||
      row.bairro.toLowerCase().includes(searchText.toLowerCase()) ||
      row.cidade.toLowerCase().includes(searchText.toLowerCase()) ||
      row.estado.toLowerCase().includes(searchText.toLowerCase()) ||
      row.cep.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div>
      <Paper elevation={3} style={{ padding: '8px' }}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6">
              <MuiLink to="/" style={{ textDecoration: 'none', color: 'gray', fontSize: '12px', cursor: 'pointer', underline: 'hover' }}>
                Home
              </MuiLink>
            </Typography>
          </Grid>
          <Grid item>
            <Title>Endereços</Title>
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
                  size='small'
                />
              </Grid>
              <Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={MuiLink} to={`/cadastrar-endereco/${idFornecedor}`} variant="contained" color="success" size='large'>
                Cadastrar
              </Button>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginTop: '8px' }}>
              <DataGrid
                key={rows.length}
                rows={filteredRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleConfirmExcluir={handleConfirmExcluir}
      />
    </div>
  );
}

export default EnderecosFornecedor;
