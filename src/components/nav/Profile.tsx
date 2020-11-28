import React from 'react';
import { Link } from 'react-router-dom';
import { useComponentVisible } from '../utils';
import './styles.scss';

const Profile = () => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    return (
        <span className="profile" ref={ref} onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <img src="https://picsum.photos/50/50" alt="profile" width="38" height="38"/>
            {isComponentVisible &&
                <div className="profile__dropdown">
                    <Link to="/gabe">View Profile</Link>
                    <Link to="/settings">Settings and privacy</Link>
                    <Link to="/logout">Log out</Link>
                </div>
            }
        </span>
    );
}

export default Profile;