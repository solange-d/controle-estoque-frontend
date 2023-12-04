import { createContext } from 'react'
const authContext = createContext({logado: false, usuario: {}});
export default authContext ;