'use client';

import { useState } from 'react';

export default function Characters() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const resp = await fetch('/api/characters', {});

    const json = await resp.json();
    setCharacters(json.docs);
  };

  return (
    <div className="characters">
      <h3>Characters</h3>
      {JSON.stringify(characters)}
      <button onClick={getCharacters}>Get Characters</button>
    </div>
  );
}
