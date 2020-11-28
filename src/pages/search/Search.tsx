import React, { useState } from 'react';
import './styles.scss';

import Timeline from '../../components/timeline/Timeline';
import Tab from '../../components/tab/Tab';

const Search = () => {
    const tabs = ["Popular", "Latest", "Media"];
    const defaultTab = "Popular";
    const [currentTab, setCurrentTab] = useState(defaultTab);

    const getTabElements = () => {
        switch (currentTab) {
            case "Popular":
                return <Timeline/>
            default:
                return <div>not implemented yet</div>
        }
    }
    return (
        <div className="setup-page">
            <div className="search-value">
                <div>nadeshot</div>
            </div>
            <div className="setup-page__centre">
                <Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                {getTabElements()}
            </div>
        </div>
    );
}

export default Search;