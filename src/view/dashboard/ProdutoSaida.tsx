import * as React from 'react';

import Title from '../../components/Title';
import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '../../imports/MaterialUI';

function createData(
  id: number,
  data: string,
  nome: string,
  marca: string,
  valor: string,
  ean: number,
) {
  return { id, data, nome, marca, valor, ean };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'produto 1',
    'marca 1',
    '100,00',
    123456,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'produto 2',
    'marca 2',
    '200,00',
    123456,
  ),
  createData(
    2,
    '16 Mar, 2019',
    'produto3',
    'marca 3',
    '300,00',
    123456,
    ),
  createData(
    3,
    '16 Mar, 2019',
    'produto 4',
    'marca 4',
    '400,00',
    123456,
  ),
  createData(
    4,
    '16 Mar, 2019',
    'produto 5',
    'marca 5',
    '100,00',
    123456,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Products() {
  return (
    <React.Fragment>
      <Title>Produtos Mais Vendidos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell align="right">EAN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.marca}</TableCell>
              <TableCell>{row.valor}</TableCell>
              <TableCell align="right">{row.ean}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver mais
      </Link>
    </React.Fragment>
  );
}
