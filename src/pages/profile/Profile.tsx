import React, { useState } from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';

import Nav from '../../components/nav/Nav';
import Timeline from '../../components/timeline/Timeline';
import Tab from '../../components/tab/Tab';

const Profile = () => {
    const tabs = ["Posts", "Likes", "Media"];
    const defaultTab = "Posts";

    const { username } = useParams<{ username: string }>();
    const [currentTab, setCurrentTab] = useState(defaultTab);

    const getTabElements = () => {
        switch (currentTab) {
            case "Posts":
                return <Timeline/>
            default:
                return <div>not implemented yet</div>
        }
    }

    return (
        <React.Fragment>
            <Nav/>
            <div className="profile-header">
                <img className="profile-header__bg" src="https://picsum.photos/1024/200" alt="Profile background"/>
                <div className="profile-header__desc">
                    <img src="https://picsum.photos/100/100" alt="Profile"/>
                    <div className="card">
                        <div className="followers">
                            <div className="followers__count">100<span> followers</span></div>
                            <button className="followers__btn btn btn-thin">Follow</button>
                        </div>
                        <div className="card__username">Gabe</div>
                        <div className="card__bio">Computer science studient and aspiring software engineer.</div>
                    </div>
                </div>
            </div>
            <div className="setup-page profile">
                <div className="setup-page__centre">
                    <Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                    {getTabElements()}
                </div>
            </div>
        </React.Fragment>
    );
}
export default Profile;