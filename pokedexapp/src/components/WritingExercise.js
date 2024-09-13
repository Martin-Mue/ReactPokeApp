// src/components/WritingExercise.js
import React, { useState, useCallback } from 'react';


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

    const getImagePath = (word) => {
        return `/images/${word.toLowerCase()}.jpg`;
    };

    return (
        <div className="writing-exercise">
            <h1 className="exercise-title">Schreibe das Wort:</h1>
            <div className="image-container">
                <img 
                    src={getImagePath(correctWord)} 
                    alt={correctWord} 
                    onError={(e) => {e.target.onerror = null; e.target.src='/images/placeholder.jpg'}}
                />
            </div>
            <h2 className="word-display">{correctWord}</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Schreibe hier..."
                className="word-input"
            />
            <div className="button-container">
                <button className="answer-button" onClick={checkAnswer}>Überprüfen</button>
                <button className="nav-button" onClick={loadNewWord}>Nächstes Wort</button>
            </div>
            {feedback && <p className="feedback">{feedback}</p>}
        </div>
    );
};

export default WritingExercise;