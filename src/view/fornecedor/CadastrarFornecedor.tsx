import * as React from 'react';
import { TextField, Button, Paper, Typography, Grid, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { cadastrarFornecedor } from '../../api/FornecedorService';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface FormValues {
  cnpj: string;
  email: string;
  nome: string;
  telefone: string;
}

function CadastroFornecedorForm() {
  const [formValues, setFormValues] = React.useState<FormValues>({
    cnpj: '',
    email: '',
    nome: '',
    telefone: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await cadastrarFornecedor(formValues);

      setFormValues({
        cnpj: '',
        email: '',
        nome: '',
        telefone: '',
      });

    } catch (error) {
      // Lide com erros durante o cadastro, por exemplo, exibindo uma mensagem de erro
      console.error('Erro ao cadastrar fornecedor:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px', // Adicione um espaçamento superior desejado
      }}
    >
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Cadastro de Fornecedor
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
            <Grid item xs={8}/>
            <Grid item xs={6}>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained" color="success">
                  Cadastrar
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
      <Alert  severity="success">This is a success alert — check it out!</Alert>
    </Box>
    
  );
}

export default CadastroFornecedorForm;
