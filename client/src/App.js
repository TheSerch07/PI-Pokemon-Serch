import './App.css';
import Order from './components/Order';
import Pokemons from './components/Pokemons';
import SearchBar from './components/SearchBar';


function App() {
  return (
    <div className="App">
      < SearchBar />
      < Order />
      < Pokemons />
    </div>
  );
}

export default App;
