import React from 'react';
import { MdSearch } from 'react-icons/md';
import './styles.scss';

const SearchBar = (props: any) => (
    <div className="search-bar">
        <input className="search-bar__input input-form" type="text" placeholder="Search Twotter"/>
        <button className="search-bar__icon-btn"><MdSearch/></button>
        <div className="will this work">
            {/* {props.children} */}
        </div>
    </div>
);

export default SearchBar;