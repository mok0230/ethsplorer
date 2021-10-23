import './App.css';
import Dashboard from './Dashboard';
import { AppProvider } from './AppProvider'

function App() {
  return (
    <AppProvider>
      <Dashboard></Dashboard>
    </AppProvider>
  );
}

export default App;
