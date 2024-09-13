import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvolutionChain, getPokemonDetails } from '../services/api';
import { getGermanName } from '../utils/pokemonNameUtils';

const EvolutionChain = ({ url }) => {
  const [chain, setChain] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      const chainData = await getEvolutionChain(url);
      const processedChain = await processChain(chainData.chain);
      setChain(processedChain);
    };
    fetchEvolutionChain();
  }, [url]);

  const processChain = async (chainLink) => {
    const pokemon = await getPokemonDetails(chainLink.species.name);
    const result = {
      id: pokemon.id,
      name: getGermanName(pokemon.name),
      image: pokemon.sprites.other['official-artwork'].front_default,
      evolvesTo: []
    };

    if (chainLink.evolves_to.length > 0) {
      for (const evolution of chainLink.evolves_to) {
        result.evolvesTo.push(await processChain(evolution));
      }
    }

    return result;
  };

  if (!chain) return <div>Loading evolution chain...</div>;

  const renderEvolution = (pokemon) => (
    <div key={pokemon.id} className="evolution-item">
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.image} alt={pokemon.name} className="evolution-image" />
        <div className="evolution-name">{pokemon.name}</div>
      </Link>
      {pokemon.evolvesTo.length > 0 && (
        <div className="evolution-arrow">→</div>
      )}
      {pokemon.evolvesTo.map(renderEvolution)}
    </div>
  );

  return (
    <div className="evolution-chain">
      <h3>Evolution Chain</h3>
      <div className="evolution-container">
        {renderEvolution(chain)}
      </div>
    </div>
  );
};

export default EvolutionChain;