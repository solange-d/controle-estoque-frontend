import React, {useContext} from 'react';
import { Button, MenuItem, Menu, IconButton, AccountCircleSharp } from '../imports/MaterialUI'; 
import { useNavigate } from 'react-router-dom';
import authContext from '../api/context';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const auth = useContext(authContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMinhaConta = () => {
    navigate('/minha-conta')
  }
  
  const handleSair = () => {
    auth.logado = false;
    auth.usuario = {}
    navigate('/')
  }

  return (
    <div>
        <IconButton  
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <AccountCircleSharp fontSize='large' sx={{color: 'white'}}/>
        </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleMinhaConta}>Minha Conta</MenuItem>
        <MenuItem onClick={handleSair}>Sair</MenuItem>
      </Menu>
    </div>
  );
}