import React from 'react';
import { Link } from 'react-router-dom';
import { GiKiwiBird } from 'react-icons/gi';
import './styles.scss';

import SearchBar from './SearchBar';
import Profile from './Profile';

const Nav = () => (
    <div className="nav">
        <div className="nav__wrapper">
            <Link to="/" className="nav__site-icon"><GiKiwiBird/></Link>
            <SearchBar>hello world</SearchBar>
            <Profile/>
        </div>
    </div>
);

export default Nav;