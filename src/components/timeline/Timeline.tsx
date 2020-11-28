import React from 'react';
import './styles.scss';

import Post from '../post/Post';

const Timeline = () => {
    return (
        <div className="timeline">
            <Post repost="true" profileURL="https://picsum.photos/50/50" username="Gabe" date="15m" message="Vivamus cursus magna nec volutpat viverra. Vivamus at porta ligula. Pellentesque consectetur, risus sed semper vehicula, arcu urna hendrerit neque."/>
        </div>
    );
}

export default Timeline;
