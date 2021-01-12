import React from 'react';
import { Link } from 'react-router-dom';
import { GiKiwiBird } from 'react-icons/gi';
import './styles.scss';

import SearchBar from './SearchBar';
import Profile from './Profile';

/**
 * Represents the navigation bar.
 */
const Nav = () => (
    <React.Fragment>
        <div className="nav">
            <div className="nav__wrapper">
                <Link to="/" className="nav__site-icon"><GiKiwiBird/></Link>
                <SearchBar></SearchBar>
                <Profile/>
            </div>
        </div>
        <div className="nav-spacer"/>
    </React.Fragment>
);

export default Nav;