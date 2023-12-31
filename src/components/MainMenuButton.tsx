import React, {useContext} from 'react';
import { Paper, MenuList, MenuItem, ListItemIcon, LocalShippingOutlined,
         ListItemText, Inventory2Outlined, PeopleAltOutlined, DashboardOutlined,
         Divider, AssessmentOutlined } from '../imports/MaterialUI';
import { Link } from 'react-router-dom';
import authContext from '../api/context';

export default function MainMenuButton() {
  const auth = useContext(authContext);
  const handleClose = () => { };

  const handlePaperClick = (event) => {
    event.stopPropagation();
  };

  function renderIfIsLogged() {
    
  }

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }} onClick={handlePaperClick}>
      <MenuList>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
          </Link>

        <Link to="/usuario" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PeopleAltOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Gerengiar Usuários</ListItemText>
          </MenuItem>
        </Link>

        <Link to="/fornecedores" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LocalShippingOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Gerenciar Fornecedores</ListItemText>
          </MenuItem>
        </Link>

        <Link to="/produto" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Inventory2Outlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Gerenciar Produtos</ListItemText>
          </MenuItem>
        </Link>

        <Divider />
        { 
          auth.logado && auth.usuario.administrador ? 
          <Link to="/relatorio" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <ListItemIcon>
              <AssessmentOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Relatórios</ListItemText>
          </MenuItem>
        </Link> : null
        }
      </MenuList>
    </Paper>
  );
}
