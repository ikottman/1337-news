import { Stories } from './Stories';
import { StoreProvider } from './Store';

function App() {
  return (
    <div>
      <StoreProvider>
        <Stories/>
      </StoreProvider>
    </div>
  );
}

export default App;
