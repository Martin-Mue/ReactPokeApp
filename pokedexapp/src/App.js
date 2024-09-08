import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import PokemonQuiz from './components/PokemonQuiz';
import PokemonReadingExercise from './components/PokemonReadingExercise';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>PapasPokeDexApp</h1>
          <nav>
          <li><Link to="/">Pokédex</Link></li>
          <li><Link to="/quiz">Pokémon-Quiz</Link></li>
          <li><Link to="/reading">Leseübung</Link></li>
        
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/quiz" element={<PokemonQuiz />} />
            <Route path="/reading" element={<PokemonReadingExercise />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;