import { Stories } from './Stories';
import './App.css';
import { StoreProvider } from './Store';

function App() {
  return (
    <div class="App">
      <header class="App-header">
      <StoreProvider>
        <Stories/>
      </StoreProvider>
      </header>
    </div>
  );
}

export default App;
