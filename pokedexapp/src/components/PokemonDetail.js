import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails, getPokemonSpecies } from '../services/api';
import { getGermanName } from '../utils/pokemonNameUtils';
import EvolutionChain from './EvolutionChain';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await getPokemonDetails(id);
      const speciesData = await getPokemonSpecies(id);
      setPokemon(pokemonData);
      setSpecies(speciesData);
    };
    fetchData();
  }, [id]);

  if (!pokemon || !species) return <div>Loading...</div>;

  return (
    <div className="pokemon-detail">
      <div className="pokemon-header">
        <h2>#{pokemon.id} {getGermanName(pokemon.name)}</h2>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className="pokemon-image"
        />
      </div>
      
      <div className="pokemon-info-grid">
        <div className="info-section">
          <h3>Types</h3>
          <div className="type-list">
            {pokemon.types.map((type) => (
              <span key={type.type.name} className={`type-badge ${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Abilities</h3>
          <ul className="ability-list">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className="info-section">
          <h3>Base Stats</h3>
          <div className="stat-grid">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-item">
                <span className="stat-name">{stat.stat.name}</span>
                <div className="stat-bar-container">
                  <div className="stat-bar" style={{width: `${(stat.base_stat / 255) * 100}%`}}></div>
                </div>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Pokédex Entry</h3>
          <p className="pokedex-entry">{species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>
        </div>

        <div className="info-section">
          <h3>Other Details</h3>
          <div className="details-grid">
            <div>Height: {pokemon.height / 10}m</div>
            <div>Weight: {pokemon.weight / 10}kg</div>
            <div>Base Experience: {pokemon.base_experience}</div>
            <div>Habitat: {species.habitat ? species.habitat.name : 'Unknown'}</div>
            <div>Growth Rate: {species.growth_rate.name}</div>
          </div>
        </div>
      </div>

      <EvolutionChain url={species.evolution_chain.url} />
    </div>
  );
};

export default PokemonDetail;