const API_HOST = import.meta.env.VITE_API_HOST;
const MODE = import.meta.env.MODE;

function App() {
  return (
    <div>
    <div>Show cool stuff here!</div>
    <div>MODE: {MODE}</div>
    <div>API HOST: {API_HOST}</div>
    </div>
  );
}

export default App;
