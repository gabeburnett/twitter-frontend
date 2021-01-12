import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../../components/nav/Nav';
import Timeline, { TimelineType } from '../../components/timeline/Timeline';
import './styles.scss';

/**
 * Represents the search results page.
 */
const Search = () => {
    const query = new URLSearchParams(useLocation().search);

    return (
        <React.Fragment>
            <Nav/>
            <div className="setup-page">
                <div className="search-value">
                    <div>{query.get("keywords")!}</div>
                </div>
                <div className="setup-page__centre">
                    <Timeline type={TimelineType.Search} keywords={query.get("keywords")!}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Search;