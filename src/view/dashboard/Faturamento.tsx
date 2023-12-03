import * as React from 'react';
import { Link, Typography, ListItemIcon, CurrencyExchangeRounded } from '../../imports/MaterialUI';
import Title from '../../components/Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function TotalBilled() {
  return (
    <React.Fragment>
      <Title>Faturamento</Title>
      <ListItemIcon>
        <CurrencyExchangeRounded color='primary' fontSize='large' style={{ color: '#008000' }}/>
      </ListItemIcon>
      <Typography component="p" variant="h4">
        R$3.024,00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        em Novembro, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver mais
        </Link>
      </div>
    </React.Fragment>
  );
}