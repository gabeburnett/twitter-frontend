import React from 'react';
import './styles.scss';

import Nav from '../../components/nav/Nav';
import Timeline from '../../components/timeline/Timeline';
import Compose from '../../components/compose/Compose';

const Home = () => (
    <React.Fragment>
        <Nav/>
        <div className="setup-page setup-page__centre home">
            <Compose/>
            <Timeline/>
        </div>
    </React.Fragment>
);

export default Home;