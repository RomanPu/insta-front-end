import { useState} from 'react';

export function SearchBar({ onSearch, type = "" , value = ""}) {

    function handleChange(ev) {
        onSearch(ev.target.value);       
    }

    return (
        <div className= {`search-bar ${type}`}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search"
            />
        </div>
    );
}