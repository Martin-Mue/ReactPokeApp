// src/components/EvolutionChain.js
import React, { useState, useEffect } from 'react';
import { getEvolutionChain } from '../services/api';
import { Link } from 'react-router-dom';

const EvolutionChain = ({ url }) => {
  const [chain, setChain] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      const data = await getEvolutionChain(url);
      setChain(data.chain);
    };
    fetchEvolutionChain();
  }, [url]);

  const renderEvolution = (pokemon) => {
    return (
      <div key={pokemon.species.name}>
        <Link to={`/pokemon/${pokemon.species.url.split('/').slice(-2)[0]}`}>
          {pokemon.species.name}
        </Link>
        {pokemon.evolves_to.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {pokemon.evolves_to.map(renderEvolution)}
          </div>
        )}
      </div>
    );
  };

  if (!chain) return <div>Loading evolution chain...</div>;

  return (
    <div className="evolution-chain">
      <h3>Evolution Chain:</h3>
      {renderEvolution(chain)}
    </div>
  );
};

export default EvolutionChain;