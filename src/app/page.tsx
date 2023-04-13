'use client';

import { useEffect, useState } from 'react';

import CharacterSearch from './components/CharacterSearch';
import MovieSearch from './components/MovieSearch';
import SelectedQuote from './components/SelectedQuote';

export default function Home() {
  const [quotes, setQuotes] = useState<any>([]);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/quotes?page=1'),
      fetch('/api/quotes?page=2'),
      fetch('/api/quotes?page=3'),
    ]).then(([p1, p2, p3]) =>
      Promise.all([p1.json(), p2.json(), p3.json()]).then(
        ([json1, json2, json3]) => {
          console.log(json1, json2, json3);
          setQuotes([...json1.docs, ...json2.docs, ...json3.docs]);
        },
      ),
    );

    // fetch('/api/quotes?limit=2500')
    //   .then(resp => resp.json())
    //   .then(json => {
    //     console.log(json);
    //     setQuotes(json.docs);
    //   });
  }, []);

  const play = () => {
    setSelectedQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const checkAnswer = () => {};

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
          onClick={checkAnswer}
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

  return (
    <div className="container">
      <h1>Lord of the Rings Quote Quiz</h1>
      <h2>You shall not pass</h2>
      <p>
        Guess the character who said the quote and which movie it was said in!
      </p>
      {selectedQuote ? displayQuoteGuessing() : displayPlayButton()}
    </div>
  );
}
