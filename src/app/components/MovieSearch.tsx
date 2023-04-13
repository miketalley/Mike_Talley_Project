'use client';

import SearchApi from './SearchApi';

export default function MovieSearch({
  onSelectMovie,
  selectedMovie,
}: {
  onSelectMovie: Function;
  selectedMovie: any;
}) {
  return (
    <SearchApi
      title="Which movie was it said in?"
      apiEndpointPath="movie"
      placeholder="Type the movie that you think this quote was said in"
      onSelectItem={onSelectMovie}
      selectedItem={selectedMovie}
    />
  );
}
