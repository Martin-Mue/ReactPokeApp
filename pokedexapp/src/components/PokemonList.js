import React, { useState, useEffect } from 'react';
import PokemonSearch from './PokemonSearch';
import { getAllPokemon } from '../services/api';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';
import { getGermanName } from '../utils/pokemonNameUtils';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 28;
    const navigate = useNavigate();
  useEffect(() => {
    const fetchAllPokemon = async () => {
        setIsLoading(true);
        const data = await getAllPokemon();
        if (data && data.results) {
          setPokemonList(data.results);
        }
        setIsLoading(false);
      };
      fetchAllPokemon();
    }, []);

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const handleRandomPokemon = () => {
        const randomId = Math.floor(Math.random() * pokemonList.length) + 1;
        navigate(`/pokemon/${randomId}`);
      };
    
      if (isLoading) {
        return <div>Loading all Pokémon...</div>;
      }
      
      return (
        <div className="pokemon-list">
        <h1>Kompletter Pokédex</h1>
        <PokemonSearch />
        <button className="nav-button" onClick={handleRandomPokemon}>Random Pokémon</button>
        <div className="pokemon-grid">
          {currentPokemon.map((pokemon, index) => (
            <PokemonCard key={pokemon.name} pokemon={{...pokemon, name: getGermanName(pokemon.name)}} pokedexNumber={indexOfFirstPokemon + index + 1} />
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(pokemonList.length / pokemonPerPage) }, (_, i) => (
            <button className="nav-button" key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
    };

export default PokemonList;