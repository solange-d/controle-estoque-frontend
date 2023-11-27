import * as React from 'react';
import { TextField, Button, Paper, Typography, Grid, Box, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cadastrarEnderecoFornecedor } from '../../api/EnderecoService'; // Importe o serviço adequado
import Alert from '@mui/material/Alert';
import { successMessage } from '../../messages/messages';

interface FormValues {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  estado: string;
  referencia: string;
}

const estadosBrasileiros = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

function CadastroEnderecoFornecedorForm() {
  const { idFornecedor } = useParams();
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
  const successText = successMessage('Endereço cadastrado com sucesso');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Verificar se o campo alterado é o CEP
    if (name === 'cep' && value.length === 8) {
      // Se o CEP tem 8 dígitos, realizar a busca dos dados
      buscarDadosDoCep(value);
    }
  };

  const buscarDadosDoCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        // Preencher os campos com os dados obtidos
        setFormValues((prevValues) => ({
          ...prevValues,
          logradouro: data.logradouro,
          bairro: data.bairro,
          municipio: data.localidade,
          estado: data.uf,
          referencia: data.complemento,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar dados do CEP:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Adapte o serviço para receber todos os campos necessários
      await cadastrarEnderecoFornecedor(idFornecedor, formValues);
      setShowAlert(true);
      setTimeout(() => {
        // Redirecione para a página de endereços, ajustando o caminho conforme necessário
        navigate(`/enderecos-fornecedor/${idFornecedor}`);
      }, 2000);
      setFormValues({
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        municipio: '',
        estado: '',
        referencia: '',
      });
    } catch (error) {
      // Lide com erros durante o cadastro, por exemplo, exibindo uma mensagem de erro
      console.error('Erro ao cadastrar endereço:', error);
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
          Cadastro de Endereço do Fornecedor
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="CEP"
                name="cep"
                value={formValues.cep}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                label="Logradouro"
                name="logradouro"
                value={formValues.logradouro}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Número"
                name="numero"
                value={formValues.numero}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                required
                select
                fullWidth
                label="Estado"
                name="estado"
                value={formValues.estado}
                onChange={handleChange}
              >
                {estadosBrasileiros.map((estado) => (
                  <MenuItem key={estado.value} value={estado.value}>
                    {estado.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Referência"
                name="referencia"
                value={formValues.referencia}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}/>
            <Grid item xs={6}>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained" color="success">
                  Cadastrar
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

export default CadastroEnderecoFornecedorForm;
