import React, { useState } from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom'; 
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
            <div className="profile-header">
                <img className="profile-header__bg" src="https://picsum.photos/1024/200" alt="Profile background"/>
                <div className="profile-header__card">
                    <img className="profile-header__card__profile" src="https://picsum.photos/100/100" alt="Profile"/>
                    <div className="profile-header__card__desc">
                        <div>Gabe</div>
                        <div>Computer science studient and aspiring software engineer.</div>
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