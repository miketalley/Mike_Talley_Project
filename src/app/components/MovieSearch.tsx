'use client';

import { useState } from 'react';
import Fuse from 'fuse.js';
import { debounce } from '../lib';

export default function MovieSearch({
  onSelectMovie,
  selectedMovie,
}: {
  onSelectMovie: Function;
  selectedMovie: any;
}) {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const resp = await fetch(`/api/movies?name=/.*${searchText}.*/i`);
    const json = await resp.json();

    // Fuzzy match the results since the API does not do a good job of ordering them
    const fuse = new Fuse(json.docs, {
      keys: ['name'],
    });

    const res: any = fuse.search(searchText);

    setMovies(res);
  };

  const onType = (e: any) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
    debouncedGetMovies();
  };

  const selectMovie = (movie: any) => {
    onSelectMovie(movie);
    setSearchText('');
    setMovies([]);
  };

  const debouncedGetMovies = debounce(getMovies, 150);

  const displaySelectedMovie = () => {
    return (
      <>
        <div className="selected-movie">
          {selectedMovie && selectedMovie.item.name}
        </div>
        <button className="clear" onClick={() => selectMovie(null)}>
          Clear
        </button>
      </>
    );
  };

  const displayMovieSearch = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Type the movie that you think this quote was said in"
          value={searchText}
          onChange={onType}
        />

        <div className="movie-results">
          {movies.map((movie: any) => {
            return (
              <div key={movie.item._id} onClick={() => selectMovie(movie)}>
                {movie.item.name}
              </div>
            );
          })}
        </div>
        {/* {JSON.stringify(movies)} */}
      </>
    );
  };

  return (
    <div className="movies">
      <h3>Which movie was it said in?</h3>
      {selectedMovie ? displaySelectedMovie() : displayMovieSearch()}
    </div>
  );
}
