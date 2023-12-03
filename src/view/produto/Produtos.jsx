import * as React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Paper, IconButton, Typography, Grid, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AlertDialog from '../../components/AlertDialog';
import { obterTodosProdutos, excluirProduto } from '../../api/ProdutoService';
import { obterTodosFornecedores } from '../../api/FornecedorService';
import Title from '../../components/Title';
import { Link as MuiLink } from 'react-router-dom';

function Produtos() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [fornecedores, setFornecedores] = React.useState([]);

  React.useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await obterTodosProdutos(); 
        if (response && Array.isArray(response)) {
          const rowsWithId = response.map((row, index) => ({ ...row, id: index + 1 }));
          setRows(rowsWithId);
        } else {
          console.error('A resposta da API não contém um array de dados');
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };
  
    carregarProdutos();
  }, []);

  React.useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        const listaFornecedores = await obterTodosFornecedores();
        setFornecedores(listaFornecedores);
      } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
      }
    };

    carregarFornecedores();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 230 },
    { field: 'marca', headerName: 'Marca', width: 230 },
    { field: 'ean', headerName: 'EAN', width: 130 },
    { field: 'altura', headerName: 'Altura', width: 130 },
    { field: 'largura', headerName: 'Largura', width: 130 },
    { field: 'comprimento', headerName: 'Comprimento', width: 130 },
    { field: 'peso', headerName: 'Peso', width: 130 },
    {
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton component={MuiLink} to={`/editar-produto/${params.row.idProduto}`}>
            <Edit fontSize="small" color="primary" />
          </IconButton>
          <IconButton onClick={() => handleExcluir(params.row)}>
            <Delete fontSize="small" color="error" />
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

  const handleConfirmExcluir = async () => {
    try {
      const fornecedorDoProduto = fornecedores.find(fornecedor =>
        fornecedor.nome === selectedRow.marca
        
      );
    
      if (!fornecedorDoProduto) {
        console.error('Fornecedor não encontrado para o produto selecionado');
        return;
      }
     
      await excluirProduto(selectedRow.idProduto, fornecedorDoProduto.idFornecedor);
      
      setRows((prevRows) => prevRows.filter((row) => row.idProduto !== selectedRow.idProduto));

      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao excluir produto:', error.message);
      handleCloseDialog();
    }
  };
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  
  const filteredRows = rows.filter((row) => {
    const searchTextLowerCase = searchText ? searchText.toLowerCase() : '';
  
    return (
      (row.nome && row.nome.toLowerCase().includes(searchTextLowerCase)) ||
      (row.marca && row.marca.toLowerCase().includes(searchTextLowerCase)) ||
      (row.ean && row.ean.toLowerCase().includes(searchTextLowerCase)) ||
      (row.altura && row.altura.toLowerCase().includes(searchTextLowerCase)) ||
      (row.largura && row.largura.toLowerCase().includes(searchTextLowerCase)) ||
      (row.comprimento && row.comprimento.toLowerCase().includes(searchTextLowerCase)) ||
      (row.peso && row.peso.toLowerCase().includes(searchTextLowerCase))
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
            <Title>Produtos</Title>
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
                <Button component={MuiLink} to="/cadastrar-produto" variant="contained" color="success" size='large'>
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

export default Produtos;