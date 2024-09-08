import React, { useState, useEffect, useCallback } from 'react';
import { getPokemonDetails } from '../services/api';
import { getGermanName, getEnglishName } from '../utils/pokemonNameUtils';

const PokemonQuiz = () => {
  const [quizLength, setQuizLength] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [options, setOptions] = useState([]);

  const getWrongAnswers = useCallback(async (correctAnswer) => {
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const pokemon = await getPokemonDetails(randomId);
      if (pokemon.name !== correctAnswer && !wrongAnswers.includes(getGermanName(pokemon.name)))  {
        wrongAnswers.push(getGermanName(pokemon.name));
      }
    }
    return wrongAnswers;
  }, []);

  const loadNewQuestion = useCallback(async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const pokemon = await getPokemonDetails(randomId);
    setCurrentPokemon(pokemon);

    const correctAnswer = getGermanName(pokemon.name);
    const wrongAnswers = await getWrongAnswers(pokemon.name);
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [getWrongAnswers]);
  const handleAnswer = (selectedAnswer) => {
    if (getEnglishName(selectedAnswer) === currentPokemon.name) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };
  useEffect(() => {
    if (currentQuestion < quizLength) {
      loadNewQuestion();
    } else {
      setQuizEnded(true);
    }
  }, [currentQuestion, quizLength, loadNewQuestion]);



  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizEnded(false);
  };

  const handleQuizLengthChange = (event) => {
    setQuizLength(parseInt(event.target.value));
    handleRestart();
  };

  if (quizEnded) {
    return (
      <div className="quiz-result">
        <h2>Quiz beendet!</h2>
        <p>Dein Ergebnis: {score} von {quizLength} Punkten</p>
        <button onClick={handleRestart}>Nochmal spielen</button>
      </div>
    );
  }

  return (
    <div className="pokemon-quiz">
      <h2>Pokémon-Quiz</h2>
      <select value={quizLength} onChange={handleQuizLengthChange}>
        <option value="5">5 Fragen</option>
        <option value="10">10 Fragen</option>
        <option value="15">15 Fragen</option>
        <option value="20">20 Fragen</option>
      </select>
      <p>Frage {currentQuestion + 1} von {quizLength}</p>
      <p>Punkte: {score}</p>
      {currentPokemon && (
        <>
          <img src={currentPokemon.sprites.other['official-artwork'].front_default} alt="Wer ist dieses Pokémon?" />
          <p>Wer ist dieses Pokémon?</p>
          {options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default PokemonQuiz;