import './App.css';
import { AppProvider } from "./AppProvider"
import BlockTable from "./BlockTable"
import Dashboard from './Dashboard';

function App() {

  return (
    <AppProvider>
      <Dashboard></Dashboard>
      <BlockTable></BlockTable>
    </AppProvider>
  );
}

export default App;
