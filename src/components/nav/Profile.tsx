import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useComponentVisible } from '../../utils';
import './styles.scss';
import Cookies from 'js-cookie';
import { getJSON } from '../../utils';

/**
 * Represents the profile button and dropdown.
 * Also handles logout functionality.
 */
const Profile = () => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const [profileIMG, setProfileIMG] = useState("");

    /**
     * Removes cookies on logout.
     * Definitely better ways to implement this but we'll 
     * just do this for the sake of time as this 
     * project won't see the light of day.
     */
    const onLogoutClick = () => {
        Cookies.remove("jwtToken");
        Cookies.remove("username");
    }

    useEffect(() => {
        getJSON("/api/profile/small")
            .then((res) => res.json())
            .then((res: { smallProfileURL: string }) => {
                setProfileIMG(res.smallProfileURL);
            });
    }, [])

    return (
        <span className="profile" ref={ref} onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <div className="profile__img">
                {profileIMG &&
                    <img src={profileIMG} alt="profile" width="38" height="38"/>
                }
            </div>
            {isComponentVisible &&
                <div className="profile__dropdown">
                    <Link to={"/" + Cookies.get("username")}>View Profile</Link>
                    <Link to="/login" onClick={onLogoutClick}>Log out</Link>
                </div>
            }
        </span>
    );
}

export default Profile;