import { germanToEnglishNames } from './pokemonNameMapping';

export const englishToGermanNames = Object.fromEntries(
  Object.entries(germanToEnglishNames).map(([german, english]) => [english, german])
);

export const getGermanName = (englishName) => {
  return englishToGermanNames[englishName] || englishName;
};

export const getEnglishName = (germanName) => {
  return germanToEnglishNames[germanName] || germanName;
};