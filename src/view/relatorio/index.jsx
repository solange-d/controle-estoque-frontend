import { FormControl, InputLabel, Select, MenuItem, Container, Button, Table, TableHead, TableRow, TableCell, TableBody, colors } from "@mui/material";
import { useState } from "react";

export function Relatorio() {
    const [selectedValue, setSelectedValue] = useState('');
    const [tableData, setTableData] = useState([]);

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    function handleButtonClick() {
        if (selectedValue) {
            fetch(`http://localhost:8080/api/${selectedValue}`)
              .then((response) => response.json())
              .then((data) => {
                setTableData(data);
              })
              .catch((error) => {
                console.error('Ocorreu um erro ao buscar os dados:', error);
              });
          } else {
            console.log('Por favor, selecione uma opção válida.');
          }
    }

    const formatColumnTitle = (title) => {
        return title.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
    };
    
    const renderTable = () => {
        if (tableData.length === 0) {
          return null;
        }
    
        const columns = Object.keys(tableData[0]);
    
        return (
            <div style={{ margin: '20px' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#f2f2f2' }}>
                    <TableRow>
                        {columns.map((column, index) => (
                        <TableCell key={index}>
                            <span className="uppercase">{formatColumnTitle(column)}</span>
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <TableCell key={colIndex}>{row[column]}</TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        );
    };

    return (
        <>
            <Container fixed sx={{ mx: 'auto', mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ minWidth: 200, mr: 3 }} size="medium" >
                    <InputLabel id="demo-simple-select-label">Relatório</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedValue}
                        label="Relatório"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value='estoque/estoques'>Estoques</MenuItem>
                        <MenuItem value='itemEstoque/itensEstoque'>Item/Estoque</MenuItem>
                        <MenuItem value='fornecedor/fornecedores'>Fornecedores</MenuItem>
                        <MenuItem value='movimento/movimentos'>Movimentos</MenuItem>
                        <MenuItem value='saida/saidas'>Saídas</MenuItem>
                        <MenuItem value='entrada/entradas'>Entradas</MenuItem>
                        <MenuItem value='usuario/usuarios'>Usuário</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleButtonClick}>Gerar</Button>
            </Container>
            {renderTable()}
        </>
    );
}