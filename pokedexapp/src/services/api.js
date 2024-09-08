import axios from 'axios';
import { germanToEnglishNames } from '../utils/pokemonNameMapping';
const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    return null;
  }
};

export const getPokemonDetails = async (nameOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    return null;
  }
};
export const getPokemonSpecies = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokemon species:", error);
      return null;
    }
  };
  export const getAllPokemon = async (limit = 1000, offset = 0) => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all Pokemon:", error);
      return null;
    }
  };
  export const getEvolutionChain = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
      return null;
    }
  };

  export const searchPokemon = async (name) => {
    try {
      const searchName = germanToEnglishNames[name] || name.toLowerCase();
      const response = await axios.get(`${BASE_URL}/pokemon/${searchName}`);
      return response.data;
    } catch (error) {
      console.error("Error searching Pokemon:", error);
      return null;
    }
  };