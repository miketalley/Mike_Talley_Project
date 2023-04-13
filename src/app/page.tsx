'use client';

import { useEffect, useState } from 'react';

import CharacterSearch from './components/CharacterSearch';
import MovieSearch from './components/MovieSearch';
import SelectedQuote from './components/SelectedQuote';
import GuessResults from './components/GuessResults';

export default function Home() {
  const [quotes, setQuotes] = useState<any>([]);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [guessed, setGuessed] = useState(false);

  useEffect(() => {
    // Hacky way of getting all the quotes because the limit is 1000
    Promise.all([
      fetch('/api/quote?page=1'),
      fetch('/api/quote?page=2'),
      fetch('/api/quote?page=3'),
    ]).then(([p1, p2, p3]) =>
      Promise.all([p1.json(), p2.json(), p3.json()]).then(
        ([json1, json2, json3]) => {
          setQuotes([...json1.docs, ...json2.docs, ...json3.docs]);
        },
      ),
    );
  }, []);

  const play = () => {
    setSelectedQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const displayQuoteGuessing = () => {
    return (
      <>
        <SelectedQuote selectedQuote={selectedQuote} />
        <CharacterSearch
          selectedCharacter={selectedCharacter}
          onSelectCharacter={setSelectedCharacter}
        />
        <MovieSearch
          selectedMovie={selectedMovie}
          onSelectMovie={setSelectedMovie}
        />
        <button
          className="submit"
          onClick={() => setGuessed(true)}
          disabled={!selectedMovie || !selectedCharacter || !selectedQuote}
        >
          Submit
        </button>
      </>
    );
  };

  const displayPlayButton = () => {
    return (
      <button className="play" onClick={play}>
        Play
      </button>
    );
  };

  const playAgain = () => {
    setSelectedCharacter(null);
    setSelectedMovie(null);
    setGuessed(false);
    play();
  };

  return (
    <div className="container">
      <h1>Lord of the Rings Quote Quiz</h1>
      <h2>You shall not pass</h2>
      <p>
        Guess the character who said the quote and which movie it was said in!
      </p>
      {!guessed &&
        (selectedQuote ? displayQuoteGuessing() : displayPlayButton())}
      {guessed && (
        <GuessResults
          onPlayAgain={playAgain}
          selectedQuote={selectedQuote}
          selectedCharacter={selectedCharacter}
          selectedMovie={selectedMovie}
        />
      )}
    </div>
  );
}
