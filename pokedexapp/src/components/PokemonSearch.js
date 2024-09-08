// src/components/PokemonSearch.js
import React, { useState } from 'react';
import { searchPokemon } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { getEnglishName } from '../utils/pokemonNameUtils';

const PokemonSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await searchPokemon(getEnglishName(searchTerm));
      if (result) {
        navigate(`/pokemon/${result.id}`);
      } else {
        setError('Pokémon nicht gefunden');
      }
    } catch (error) {
      setError('Ein Fehler ist aufgetreten');
    }
  };

  return (
    <form onSubmit={handleSearch}>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Pokémon suchen..."
    />
    <button className="nav-button" type="submit">Suchen</button>
    {error && <p>{error}</p>}
  </form>
);
};

export default PokemonSearch;