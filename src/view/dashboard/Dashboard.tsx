import { Paper, Container, Typography, Grid, Box } from '@mui/material';
import React from 'react';
import Link from '@mui/material/Link';
import ProdutoSaida from './ProdutoSaida';
import Faturamento from './Faturamento';
import FaturamentoAno from './FaturamentoAno';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/solange-d">
        Controle de Estoque
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <FaturamentoAno />
          </Paper>
        </Grid>
        {/* faturamento */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <Faturamento />
          </Paper>
        </Grid>
        {/* mais vendidos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ProdutoSaida />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ pt: 4 }}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Dashboard;
