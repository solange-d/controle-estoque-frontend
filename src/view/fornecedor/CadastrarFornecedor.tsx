import * as React from 'react';
import { TextField, Button, Paper, Typography, Grid, Box, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarFornecedor } from '../../api/FornecedorService';
import Alert from '@mui/material/Alert';
import { successMessage } from '../../messages/messages';

interface FormValues {
  cnpj: string;
  email: string;
  nome: string;
  telefone: string;
  fabricante: boolean;
}

function CadastroFornecedorForm() {
  const [formValues, setFormValues] = React.useState<FormValues>({
    cnpj: '',
    email: '',
    nome: '',
    telefone: '',
    fabricante: false,
  });

  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();
  const successText = successMessage('Fornecedor cadastrado com sucesso');
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
      setShowAlert(true);
        setTimeout(() => {
          navigate('/fornecedores');
        }, 2000);
      setFormValues({
        cnpj: '',
        email: '',
        nome: '',
        telefone: '',
        fabricante: false,
      });

    } catch (error) {
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
        paddingTop: '20px',
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
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="É Fabricante?"
                name="fabricante"
                value={formValues.fabricante ? 'true' : 'false'}
                onChange={(e) => setFormValues({ ...formValues, fabricante: e.target.value === 'true' })}
              >
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </TextField>
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
      {showAlert && <Alert severity="success">{successText.text}</Alert>}
    </Box>
    
  );
}

export default CadastroFornecedorForm;
