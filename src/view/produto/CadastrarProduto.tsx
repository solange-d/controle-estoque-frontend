import * as React from 'react';
import { TextField, Button, Paper, Typography, Grid, Box, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarProduto } from '../../api/ProdutoService';
import { obterTodosFornecedores } from '../../api/FornecedorService';
import Alert from '@mui/material/Alert';
import { successMessage } from '../../messages/messages';

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

function CadastroProdutoForm() {
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
  const successText = successMessage('Produto cadastrado com sucesso');

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
            await cadastrarProduto(fornecedor.idFornecedor, formValues);
            setShowAlert(true);
            setTimeout(() => {
                navigate('/produto');
            }, 2000);
            setFormValues({
                nome: '',
                marca: '',
                descricao: '',
                ean: '',
                comprimento: '',
                largura: '',
                altura: '',
                peso: '',
            });
        
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
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
          Cadastro de Produto
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
                    value={formValues.marca}
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
                  Cadastrar
                </Button>
                <Link to="/produto">
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

export default CadastroProdutoForm;