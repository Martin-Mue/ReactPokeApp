// src/components/PokemonReadingExercise.js
import React, { useState, useEffect, useCallback } from 'react';
import { getPokemonDetails } from '../services/api';
import { getGermanName } from '../utils/pokemonNameUtils';

const zebraWords = [
  "Apfel", "Baum", "Clown", "Dach", "Esel", "Fisch", "Gras", "Hund", "Igel", "Jacke",
  "Katze", "Lupe", "Maus", "Nase", "Oma", "Papa", "Qualle", "Regen", "Sonne", "Tisch",
  "Uhr", "Vase", "Wald", "Xylophon", "Yak", "Zebra", "Brot", "Schule", "Haus", "Auto",
  "Blume", "Vogel", "Buch", "Stuhl", "Tür", "Fenster", "Garten", "Himmel", "Insel", "Kuh",
  "Lampe", "Mond", "Nacht", "Obst", "Pilz", "Rad", "Schaf", "Tafel", "Ufer", "Wasser",
  "Zug", "Affe", "Ball", "Ente", "Frosch", "Giraffe", "Hase", "Iglu", "Känguru", "Löwe"
];

// Phonetische Ausspracheregeln
const phoneticRules = {
  // Lange Vokale
  'aa': 'aː', 'ee': 'eː', 'oo': 'oː', 'uu': 'uː',
  'ah': 'aː', 'eh': 'eː', 'ih': 'iː', 'oh': 'oː', 'uh': 'uː',
  'ie': 'iː',

  // Kurze Vokale vor Doppelkonsonanten
  '([aeiouäöü])([bcdfghjklmnpqrstvwxyz])\\2': '$1$2',

  // Umlaute
  'ä': 'ɛ', 'ö': 'ø', 'ü': 'y',

  // Diphthonge
  'ei': 'aɪ̯', 'ai': 'aɪ̯', 'au': 'aʊ̯', 'eu': 'ɔʏ̯', 'äu': 'ɔʏ̯',

  // Konsonanten
  'ch([aouAOU])': 'x$1',  // ach-Laut
  'ch': 'ç',  // ich-Laut (Standardfall)
  '^s([aeiouäöü])': 'z$1',  // stimmhaftes s am Wortanfang
  's$': 's',  // stimmloses s am Wortende
  '^sp': 'ʃp', '^st': 'ʃt',  // sp und st am Wortanfang
  'v': 'f',  // v als f (Standardfall)
  'w': 'v',
  'z': 'ts',

  // Auslautverhärtung
  'b$': 'p', 'd$': 't', 'g$': 'k',

  // r-Laute
  'r([aeiouäöü])': 'ʁ$1',  // gerolltes r vor Vokal
  'er$': 'ɐ', 'er([bcdfghjklmnpqrstvwxyz])': 'ɐ$1',  // vokalisiertes r

  // ng und nk
  'ng': 'ŋ', 'nk': 'ŋk',

  // Silbische Konsonanten
  'el$': 'l̩', 'em$': 'm̩', 'en$': 'n̩',

  // Glottisschlag (schwer zu implementieren, hier vereinfacht)
  '^[aeiouäöü]': 'ʔ$&',
};
  
  const getPhoneticTranscription = (word) => {
    let phoneticWord = word.toLowerCase();
  
    // Anwenden der Regeln
    Object.entries(phoneticRules).forEach(([pattern, replacement]) => {
      const regex = new RegExp(pattern, 'g');
      phoneticWord = phoneticWord.replace(regex, replacement);
    });
  
    // Behandlung von Vokalen vor einzelnem Konsonanten (tendenziell lang)
    phoneticWord = phoneticWord.replace(/([aeiouäöü])([bcdfghjklmnpqrstvwxyz])(?![bcdfghjklmnpqrstvwxyz])/g, '$1:$2');
  
    return phoneticWord;
  };

const PokemonReadingExercise = () => {
  const [word, setWord] = useState('');
  const [image, setImage] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);

  const loadRandomPokemon = useCallback(async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const pokemonData = await getPokemonDetails(randomId);
    const germanName = getGermanName(pokemonData.name);
    setWord(germanName);
    setImage(pokemonData.sprites.other['official-artwork'].front_default);
  }, []);

  const loadRandomZebraWord = useCallback(() => {
    const randomWord = zebraWords[Math.floor(Math.random() * zebraWords.length)];
    setWord(randomWord);
    setImage('');
  }, []);

  const loadRandomWord = useCallback(() => {
    if (Math.random() < 0.5) {
      loadRandomPokemon();
    } else {
      loadRandomZebraWord();
    }
  }, [loadRandomPokemon, loadRandomZebraWord]);

  useEffect(() => {
    loadRandomWord();
  }, [loadRandomWord]);

  const getSyllables = useCallback((word) => {
    const syllableRegex = /[^aeiouyäöü]*[aeiouyäöü]+(?:[^aeiouyäöü]*$|[^aeiouyäöü](?=[^aeiouyäöü]))?/gi;
    return word.match(syllableRegex) || [word];
  }, []);

  const getPhoneticTranscription = useCallback((word) => {
    let phoneticWord = word.toLowerCase();
    Object.entries(phoneticRules).forEach(([key, value]) => {
      phoneticWord = phoneticWord.replace(new RegExp(key, 'g'), value);
    });
    return phoneticWord;
  }, []);

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const phoneticWord = getPhoneticTranscription(word);
      const utterance = new SpeechSynthesisUtterance(phoneticWord);
      utterance.lang = 'de-DE';
      utterance.rate = speed;
      utterance.pitch = pitch;
      
      speechSynthesis.speak(utterance);
    }
  };


  const syllables = getSyllables(word);

  return (
    <div className="reading-exercise">
      <h2>Lese-Übung</h2>
      {image && <img src={image} alt={word} />}
      <div className="word">
        {difficulty === 'easy' ? (
          syllables.map((syllable, index) => (
            <span key={index} className="syllable">{syllable}</span>
          ))
        ) : (
          <span>{word}</span>
        )}
      </div>
      <button className="answer-button"  onClick={speakWord}>Vorlesen</button>
      <div>
        <label>Geschwindigkeit: 
          <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} />
        </label>
      </div>
      <div>
        <label>Tonhöhe: 
          <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} />
        </label>
      </div>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Leicht (mit Silbentrennung)</option>
        <option value="hard">Schwer (ohne Silbentrennung)</option>
      </select>
      <button className="nav-button"onClick={loadRandomWord}>Nächstes Wort</button>
    </div>
  );
};

export default PokemonReadingExercise;