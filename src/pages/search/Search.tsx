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
    const keywords = query.get("keywords");
    return (
        <React.Fragment>
            <Nav/>
            <div className="setup-page">
                <div className="search-value">
                    <div>{keywords!}</div>
                </div>
                <div className="setup-page__centre">
                    <Timeline key={TimelineType.Search + keywords!} type={TimelineType.Search} keywords={keywords!}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Search;