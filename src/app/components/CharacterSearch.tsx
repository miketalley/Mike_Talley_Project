'use client';

import SearchApi from './SearchApi';

export default function CharacterSearch({
  onSelectCharacter,
  selectedCharacter,
}: {
  onSelectCharacter: Function;
  selectedCharacter: any;
}) {
  return (
    <SearchApi
      title="Who said it?"
      apiEndpointPath="character"
      placeholder="Type who you think said this quote"
      onSelectItem={onSelectCharacter}
      selectedItem={selectedCharacter}
    />
  );
}
