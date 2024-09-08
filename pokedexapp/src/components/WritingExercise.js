// src/components/WritingExercise.js
import React, { useState, useCallback, useEffect } from 'react';


const zebraWords = [
    "Apfel", "Baum", "Clown", "Dach", "Esel", "Fisch", "Gras", "Hund", "Igel", "Jacke",
    "Katze", "Lupe", "Maus", "Nase", "Oma", "Papa", "Qualle", "Regen", "Sonne", "Tisch",
    "Uhr", "Vase", "Wald", "Xylophon", "Yak", "Zebra", "Brot", "Schule", "Haus", "Auto",
    "Blume", "Vogel", "Buch", "Stuhl", "Tür", "Fenster", "Garten", "Himmel", "Insel", "Kuh",
    "Lampe", "Mond", "Nacht", "Obst", "Pilz", "Rad", "Schaf", "Tafel", "Ufer", "Wasser",
    "Zug", "Affe", "Ball", "Ente", "Frosch", "Giraffe", "Hase", "Iglu", "Känguru", "Löwe",
    "Ananas", "Banane", "Erdbeere", "Giraffe", "Elefant", "Pinguin", "Schmetterling", "Regenbogen",
    "Schaukel", "Rutsche", "Sandkasten", "Luftballon", "Drache", "Schiff", "Flugzeug", "Rakete",
    "Roboter", "Dinosaurier", "Krokodil", "Eisbär", "Pinguin", "Delfin", "Schildkröte", "Eichhörnchen",
    "Marienkäfer", "Schmetterling", "Biene", "Ameise", "Schnecke", "Regenwurm", "Seestern", "Muschel"
  ];



  
  const WritingExercise = () => {
      const [inputValue, setInputValue] = useState('');
      const [correctWord, setCorrectWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * zebraWords.length);
        return zebraWords[randomIndex];
      });
      const [feedback, setFeedback] = useState('');
      const [imageUrl, setImageUrl] = useState(''); 
      
      const getRandomWord = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * zebraWords.length);
        return zebraWords[randomIndex];
      }, []);


  const loadNewWord = useCallback(() => {
    setCorrectWord(getRandomWord());
    setInputValue('');
    setFeedback('');
  }, [getRandomWord]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const checkAnswer = () => {
    if (inputValue.toLowerCase() === correctWord.toLowerCase()) {
      setFeedback('Richtig! Gut gemacht!');
    } else {
      setFeedback('Versuche es noch einmal!');
    }
  };
  const fetchImage = async (word) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setImageUrl(data.results[0].urls.small);
      } else {
        setImageUrl('');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl('');
    }
  };
  useEffect(() => {
    fetchImage(correctWord);
  }, [correctWord]);
  return (
    <div className="writing-exercise">
    <h2>Schreibe das Wort:</h2>
    {imageUrl && <img src={imageUrl} alt={correctWord} style={{maxWidth: '200px', maxHeight: '200px', objectFit: 'cover'}} />}
    <h3>{correctWord}</h3>
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Schreibe hier..."
    />
    <button className="answer-button" onClick={checkAnswer}>Überprüfen</button>
    <button className="nav-button" onClick={loadNewWord}>Nächstes Wort</button>
    {feedback && <p>{feedback}</p>}
  </div>
);
};

export default WritingExercise;