
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './components/Layout';
import Rotas from './routers/Rotas';
import { createContext } from 'react';

function App() {
  return (
    <Router>
      <Layout>
        <Rotas />
      </Layout>
    </Router>
  );
}

export default App;
