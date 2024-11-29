import { useState} from 'react';

export function SearchBar({ onSearch }) {
    const [search, setSearch] = useState('');

    function handleChange(ev) {
        setSearch(ev.target.value); 
        onSearch(ev.target.value);       
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search"
            />
        </div>
    );
}