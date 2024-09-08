import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPokemonDetails } from '../services/api';

const PokemonCard = ({ pokemon, pokedexNumber }) => {
    const [pokemonDetails, setPokemonDetails] = useState(null);
 


  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await getPokemonDetails(pokedexNumber);
      setPokemonDetails(details);
    };
    fetchPokemonDetails();
  }, [pokedexNumber]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  const artworkUrl = pokemonDetails.sprites.other['official-artwork'].front_default;

  return (
    <Link to={`/pokemon/${pokedexNumber}`} className="pokemon-card">
      <img src={artworkUrl} alt={pokemon.name} />
      <h3>#{pokedexNumber} {pokemon.name}</h3>
    </Link>
  );
};

export default PokemonCard;