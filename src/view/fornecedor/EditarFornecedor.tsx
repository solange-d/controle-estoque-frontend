import * as React from 'react';
import { TextField, Button, Paper, Typography, Grid, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { obterFornecedorPorId, atualizarFornecedor } from '../../api/FornecedorService';
import Alert from '@mui/material/Alert';
import { successMessage } from '../../messages/messages';

interface Params {
  idFornecedor: string;
  [key: string]: string | undefined;
}

interface FormValues {
  cnpj: string;
  email: string;
  nome: string;
  telefone: string;
}

function EdicaoFornecedorForm() {
  const { idFornecedor } = useParams<Params>();
  const [formValues, setFormValues] = React.useState<FormValues>({
    cnpj: '',
    email: '',
    nome: '',
    telefone: '',
  });
  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();
  const successText = successMessage('Fornecedor editado com sucesso'); 

  React.useEffect(() => {
    const carregarFornecedor = async () => {
      try {
        const fornecedor = await obterFornecedorPorId(idFornecedor);
        setFormValues({
          cnpj: fornecedor.cnpj,
          email: fornecedor.email,
          nome: fornecedor.nome,
          telefone: fornecedor.telefone,
        });
      } catch (error) {
        console.error('Erro ao carregar fornecedor para edição:', error);
      }
    };

    carregarFornecedor();
  }, [idFornecedor]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (idFornecedor) {
        await atualizarFornecedor(idFornecedor, formValues);
        setShowAlert(true);
        setTimeout(() => {
          navigate('/fornecedores');
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
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
          Editar Fornecedor
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nome"
                name="nome"
                value={formValues.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="CNPJ"
                name="cnpj"
                value={formValues.cnpj}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Telefone"
                name="telefone"
                value={formValues.telefone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} />
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

export default EdicaoFornecedorForm;
