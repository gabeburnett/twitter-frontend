import React from 'react';
import './styles.scss';
import Nav from '../../components/nav/Nav';
import Timeline, { TimelineType } from '../../components/timeline/Timeline';
import Compose from '../../components/compose/Compose';

/**
 * Represents the home page.
 */
const Home = () => {
    return (
        <React.Fragment>
            <Nav/>
            <div className="setup-page setup-page__centre home">
                <Compose/>
                <Timeline type={TimelineType.Home}/>
            </div>
        </React.Fragment>
    )
};

export default Home;