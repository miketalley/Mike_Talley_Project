'use client';

import { useState } from 'react';
import Fuse from 'fuse.js';
import { debounce } from '../lib';

export default function CharacterSearch({
  onSelectCharacter,
  selectedCharacter,
}: {
  onSelectCharacter: Function;
  selectedCharacter: any;
}) {
  const [searchText, setSearchText] = useState('');
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const resp = await fetch(`/api/character?name=/.*${searchText}.*/i`);
    const json = await resp.json();

    // Fuzzy match the results since the API does not do a good job of ordering them
    const fuse = new Fuse(json.docs, {
      keys: ['name'],
    });

    const res: any = fuse.search(searchText);

    setCharacters(res);
  };

  const onType = (e: any) => {
    setSearchText(e.target.value);
    debouncedGetCharacters();
  };

  const selectCharacter = (character: any) => {
    onSelectCharacter(character);
    setSearchText('');
    setCharacters([]);
  };

  const debouncedGetCharacters = debounce(getCharacters, 150);

  const displaySelectedCharacter = () => {
    return (
      <>
        <div className="selected-character">
          {selectedCharacter && selectedCharacter.item.name}
        </div>
        <button className="clear" onClick={() => selectCharacter(null)}>
          Clear
        </button>
      </>
    );
  };

  const displayCharacterSearch = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Type who you think said this quote"
          value={searchText}
          onChange={onType}
        />

        <div className="character-results">
          {characters.map((character: any) => {
            return (
              <div
                key={character.item._id}
                onClick={() => selectCharacter(character)}
              >
                {character.item.name}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="characters">
      <h3>Who said it?</h3>
      {selectedCharacter
        ? displaySelectedCharacter()
        : displayCharacterSearch()}
    </div>
  );
}
