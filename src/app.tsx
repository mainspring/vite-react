import { BackgroundProcessProvider } from './contexts/backround-process-provider';
import { Example } from './example';

function App() {
  return (
    <BackgroundProcessProvider>
      <Example />
    </BackgroundProcessProvider>
  );
}

export default App;
