import * as React from 'react';
import { TextField, Button, Paper, Typography, Grid, Box, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { obterProdutoPorId, atualizarProduto } from '../../api/ProdutoService';
import { obterTodosFornecedores } from '../../api/FornecedorService';
import Alert from '@mui/material/Alert';
import { successMessage } from '../../messages/messages';

interface Params {
  idProduto: string;
  [key: string]: string | undefined;
}

interface FormValues {
  nome: string;
  marca: string;
  descricao: string;
  ean: string;
  comprimento: string;
  largura: string;
  altura: string;
  peso: string;
}

function EdicaoProdutoForm() {
  const { idProduto } = useParams<Params>();
  const [formValues, setFormValues] = React.useState<FormValues>({
    nome: '',
    marca: '',
    descricao: '',
    ean: '',
    comprimento: '',
    largura: '',
    altura: '',
    peso: '',
  });

  const [selectedMarca, setSelectedMarca] = React.useState('');
  const [fornecedores, setFornecedores] = React.useState([]);
  
  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();
  const successText = successMessage('Produto editado com sucesso');

  React.useEffect(() => {
    const carregarProduto = async () => {
      try {
        const produto = await obterProdutoPorId(idProduto);
        setFormValues({
          nome: produto.nome,
          marca: produto.marca,
          descricao: produto.descricao,
          ean: produto.ean,
          comprimento: produto.comprimento,
          largura: produto.largura,
          altura: produto.altura,
          peso: produto.peso,
        });
        setSelectedMarca(produto.marca);
      } catch (error) {
        console.error('Erro ao carregar produto para edição:', error);
      }
    };

    carregarProduto();
  }, [idProduto]);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleMarcaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMarca(event.target.value);
    setFormValues({
      ...formValues,
      marca: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fornecedor = fornecedores.find(fornecedor => fornecedor.nome === selectedMarca);
    if (fornecedor) {
        try {
            await atualizarProduto(idProduto, fornecedor.idFornecedor, formValues);
            setShowAlert(true);
            setTimeout(() => {
                navigate('/produto');
            }, 2000);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px',
      }}
    >
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Editar Produto
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nome do Produto"
                name="nome"
                value={formValues.nome}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={3}>
                <TextField
                    required
                    select
                    fullWidth
                    label="Marca"
                    name="marca"
                    value={selectedMarca}
                    onChange={handleMarcaChange}
                >
                    {fornecedores.map((fornecedor) => (
                    <MenuItem key={fornecedor.id} value={fornecedor.nome}>
                        {fornecedor.nome}
                    </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Descrição"
                name="descricao"
                value={formValues.descricao}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    required
                    fullWidth
                    label="EAN (código de barras)"
                    name="ean"
                    type="number"
                    value={formValues.ean}
                    onChange={handleChange}
                    inputProps={{
                    maxLength: 13,
                    pattern: '\\d*',
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="Comprimento (cm)"
                name="comprimento"
                value={formValues.comprimento}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="Largura (cm)"
                name="largura"
                value={formValues.largura}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="Altura (cm)"
                name="altura"
                value={formValues.altura}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="Peso (kg)"
                name="peso"
                value={formValues.peso}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}/>
            <Grid item xs={6}>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained" color="success">
                  Atualizar
                </Button>
                <Link to="/fornecedores">
                    <Button variant="outlined" color="error">
                      Cancelar
                    </Button>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {showAlert && <Alert severity="success">{successText.text}</Alert>}
    </Box>
  );
}

export default EdicaoProdutoForm;
