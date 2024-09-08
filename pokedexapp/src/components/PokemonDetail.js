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
          <h2>#{pokemon.id} {getGermanName(pokemon.name)}</h2>
          <img 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name} 
        style={{ width: '300px', height: 'auto' }} // Größeres Bild
      />
         
        
          
          <h3>Types:</h3>
          <ul>
            {pokemon.types.map((type) => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
    
          <h3>Abilities:</h3>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
    
          <h3>Base Stats:</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
    
          <h3>Pokédex Entry:</h3>
          <p>{species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>
    
          <h3>Other Details:</h3>
          <p>Height: {pokemon.height / 10}m</p>
          <p>Weight: {pokemon.weight / 10}kg</p>
          <p>Base Experience: {pokemon.base_experience}</p>
          <p>Habitat: {species.habitat ? species.habitat.name : 'Unknown'}</p>
          <p>Growth Rate: {species.growth_rate.name}</p>
          <EvolutionChain url={species.evolution_chain.url} />
        </div>
      );
    };

export default PokemonDetail;