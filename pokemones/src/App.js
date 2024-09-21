import './App.css';
import RoutesApp from './routes/routes';
import { CacheProvider } from './context/contextCache';

function App() {
  return (
    <>
      <CacheProvider>
        <RoutesApp />
      </CacheProvider> 
    </>
  );
}

export default App;
