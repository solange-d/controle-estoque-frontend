
import { Button, Grid, TextField, Typography } from "@mui/material"
import { getUsuarioAutenticado } from '../../api/UsuarioService';
import React, {useRef, useContext} from "react"
import authContext from '../../api/context';
import { useNavigate } from "react-router-dom";

const MinhaConta = () => {
  const refEmail = useRef(null);
  const refSenha = useRef(null);

  const auth = useContext(authContext);
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault()
    const usuario = {
                      email : refEmail.current?.value,
                      senha : refSenha.current?.value
                    }
    
    const credentials = await getUsuarioAutenticado(usuario)
    
    if(credentials) {
      auth.logado = true;
      auth.usuario = credentials;
      navigate('/')
    }
  }

  if(!auth.logado) {
    return <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '80vh' }}
      >
      <form onSubmit={handleLogin}>
        <Grid sx={{ marginTop: 2, minWidth: 400, maxWidth: 600 }} gap={2} container direction="column">
          <TextField
            required
            label="Email"
            name="email"
            id="email"
            inputRef={refEmail}
          />
          <TextField
            required
            type="password"
            label="Senha"
            name="senha"
            id="senha"
            inputRef={refSenha}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  } else {
    return <>
      <Typography sx={{marginTop:2, marginLeft:2}}>
        Você está logado como {auth.usuario.nome}
      </Typography>
    </>
  }
}

export default MinhaConta