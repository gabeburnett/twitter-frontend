import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import './styles.scss';

/**
 * Represents the bar used for searching through posts.
 */
const SearchBar = () => {
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const [inputValue, setInputValue] = useState("");

    /**
     * Handles search submission.
     */
    const onSearchSubmit = () => {
        if (inputValue.length === 0) return;
        history.push("/search?" + new URLSearchParams({ keywords: inputValue }));
    }

    /** Set input value to the keywords in the query. */
    useEffect(() => {
        if (query.get("keywords")) {
            setInputValue(query.get("keywords")!);
        }
    }, []);

    return (
        <div className="search-bar">
            <input 
                className="search-bar__input input-form" 
                type="text" 
                placeholder="Search Twotter" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
            />
            <button className="search-bar__icon-btn" onClick={() => onSearchSubmit()}><MdSearch/></button>
        </div>
    )
};

export default SearchBar;