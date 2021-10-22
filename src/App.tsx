import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppProvider } from "./AppProvider"
import { AppContext } from "./AppProvider"
import BlockTable from "./BlockTable"

function App() {

  return (
    <AppProvider>
      <BlockTable></BlockTable>
    </AppProvider>
  );
}

export default App;
