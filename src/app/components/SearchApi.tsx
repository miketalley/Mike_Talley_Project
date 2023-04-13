'use client';

import { useState } from 'react';
import Fuse from 'fuse.js';
import { debounce } from 'debounce';

export default function SearchApi({
  apiEndpointPath,
  onSelectItem,
  placeholder,
  selectedItem,
  title,
}: {
  apiEndpointPath: string;
  onSelectItem: Function;
  placeholder: string;
  selectedItem: any;
  title: string;
}) {
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const resp = await fetch(
      `/api/${apiEndpointPath}?name=/.*${searchText}.*/i`,
    );
    const json = await resp.json();

    // Fuzzy match the results since the API does not do a good job of ordering them
    const fuse = new Fuse(json.docs, {
      keys: ['name', 'gender', 'race'],
    });

    const res: any = fuse.search(searchText);

    setItems(res);
  };

  const onType = (e: any) => {
    setSearchText(e.target.value);
    debouncedGetItems();
  };

  const selectItem = (item: any) => {
    onSelectItem(item);
    setSearchText('');
    setItems([]);
  };

  const debouncedGetItems = debounce(getItems, 150);

  const displaySelectedItem = () => {
    return (
      <div className="selected-item-container">
        <div className="selected-item">
          {selectedItem && selectedItem.item.name}
        </div>
        <button className="clear" onClick={() => selectItem(null)}>
          Clear
        </button>
      </div>
    );
  };

  const displayResults = () => {
    return (
      !!items.length && (
        <div className="results">
          {items.map((i: any) => {
            return (
              <div key={i.item._id} onClick={() => selectItem(i)}>
                {i.item.name}
              </div>
            );
          })}
        </div>
      )
    );
  };

  const displayItemSearch = () => {
    return (
      <>
        <input
          type="text"
          className={items.length ? 'search-with-results' : ''}
          placeholder={placeholder}
          value={searchText}
          onChange={onType}
        />

        {displayResults()}
      </>
    );
  };

  return (
    <div className="items">
      <h3>{title}</h3>
      {selectedItem ? displaySelectedItem() : displayItemSearch()}
    </div>
  );
}
