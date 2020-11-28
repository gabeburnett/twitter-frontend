import React from 'react';
import Timeline from '../../components/timeline/Timeline';
import Compose from '../../components/compose/Compose';
import './styles.scss';

const Home = () => (
    <div className="setup-page setup-page__centre home">
        <Compose/>
        <Timeline/>
    </div>
);

export default Home;