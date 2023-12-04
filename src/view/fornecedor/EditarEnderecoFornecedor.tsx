import * as React from 'react';
import { TextField, Button, Paper, Typography, Grid, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { obterEndereco, atualizarEnderecoFornecedor } from '../../api/EnderecoService';
import Alert from '@mui/material/Alert';
import { successMessage, errorMessage } from '../../messages/messages';

interface Params {
    idFornecedor: string;
    idEndereco?: string;
    [key: string]: string | undefined;
  }
  

interface FormValues {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  estado: string;
  referencia: string;
}

function EdicaoEnderecoFornecedorForm() {
  const { idFornecedor, idEndereco } = useParams<Params>();
  const [formValues, setFormValues] = React.useState<FormValues>({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    municipio: '',
    estado: '',
    referencia: '',
  });
  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();
  const successText = successMessage('Endereço editado com sucesso');

  React.useEffect(() => {
    const carregarEndereco = async () => {
      try {
        const endereco = await obterEndereco(idEndereco);
        setFormValues({
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          bairro: endereco.bairro,
          municipio: endereco.municipio,
          estado: endereco.estado,
          referencia: endereco.referencia,
        });
      } catch (error) {
        console.error('Erro ao carregar endereço para edição:', error);
      }
    };

    carregarEndereco();
  }, [idFornecedor, idEndereco]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await atualizarEnderecoFornecedor(idFornecedor, idEndereco, formValues);
      setShowAlert(true);
      setTimeout(() => {
        navigate(`/enderecos-fornecedor/${idFornecedor}`);
      }, 2000);
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
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
          Editar Endereço do Fornecedor
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="CEP"
                name="cep"
                value={formValues.cep}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Logradouro"
                name="logradouro"
                value={formValues.logradouro}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Número"
                name="numero"
                value={formValues.numero}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Bairro"
                name="bairro"
                value={formValues.bairro}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Município"
                name="municipio"
                value={formValues.municipio}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Estado"
                name="estado"
                value={formValues.estado}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Referência"
                name="referencia"
                value={formValues.referencia}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={6}>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained" color="success">
                  Atualizar
                </Button>
                <Link to={`/enderecos-fornecedor/${idFornecedor}`}>
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

export default EdicaoEnderecoFornecedorForm;
