import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './styles.scss';
import Cookies from 'js-cookie';
import { MdPhoto } from 'react-icons/md';
import { jsonRequest, IProfile } from '../../utils';
import Nav from '../../components/nav/Nav';
import Timeline, { TimelineType } from '../../components/timeline/Timeline';
import Tab from '../../components/tab/Tab';

/**
 * Represents a user's profile. Also handles following and editing of profiles.
 */
const Profile = () => {
    const tabs = ["Posts", "Likes"];
    const defaultTab = "Posts";
    const history = useHistory();
    const { username } = useParams<{ username: string }>();
    const [currentTab, setCurrentTab] = useState(defaultTab);

    const [profile, setProfile] = useState({} as IProfile);
    const [following, setFollowing] = useState(false);
    const [ownProfile, setOwnProfile] = useState(false);

    /** States used for editing a profile. */
    const [editingMode, setEditingMode] = useState(false);
    const [editBackground, setEditBackground] = useState(null as FileList | null);
    const [editProfile, setEditProfile] = useState(null as FileList | null);
    const [editUsername, setEditUsername] = useState("");
    const [editDesc, setEditDesc] = useState("");
    
    /**
     * Get JSX for current selected tab.
     */
    const getTabElements = () => {
        switch (currentTab) {
            case "Posts":
                return <Timeline key={TimelineType.Profile + username} type={TimelineType.Profile} username={username}/>
            case "Likes":
                return <Timeline key={TimelineType.ProfileLikes + username} type={TimelineType.ProfileLikes} username={username}/>
            default:
                return <div>not implemented yet</div>
        }
    }

    /**
     * Makes a request to follow or unfollow another user.
     */
    const onFollowClick = () => {
        if (profile.username === Cookies.get("username")) {
            return;
        } else {
            jsonRequest(following ? "DELETE" : "POST", "/api/profile/follow?", { username });
        }
        setFollowing(!following);
    }

    /**
     * Fetch core profile data on component startup.
     */
    useEffect(() => {
        jsonRequest("GET", "/api/profile?" + new URLSearchParams({ username }))
        .then((res) => {
            if (res.status === 404) {
                history.replace("/not-found");
            }
            return res.json();
        })
        .then((res) => {
            if (!res || res.error) return;
            
            setProfile(res);
            setFollowing(res.following);
            setOwnProfile(res.username === Cookies.get("username"));
            if (res.username === Cookies.get("username")) {
                setEditUsername(res.username);
                setEditDesc(res.description);
            }
        })
    }, [username]);

    /**
     * Submits profile changes.
     */
    const submitChanges = () => {
        const formData = new FormData();
        if (profile.username !== editUsername) formData.append("username", editUsername);
        if (profile.description !== editDesc) formData.append("description", editDesc);
        if (editProfile) formData.append("profile", editProfile[0]);
        if (editBackground) formData.append("background", editBackground[0]);
        if (!formData.values().next().done) {
            fetch(process.env.REACT_APP_API_HOST + "/api/profile/update", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "*",
                    "Authorization": "Bearer " + Cookies.get("jwtToken")},
                body: formData
            })
            .then((response) => {
                console.log('Success:', response);
                window.location.reload(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    /** 
     * Handles the top right button on the profile card.
     */
    const getCardButton = () => {
        let btnName = "Follow";
        if (ownProfile) btnName = editingMode ? "Save" : "Edit";
        
        const onButtonClick = () => {
            if (ownProfile) {
                if (editingMode) {
                    setEditingMode(false);
                    submitChanges();
                } else {
                    setEditingMode(true);
                }
            } else {
                onFollowClick();
            }
        }

        return <button 
            className={"card-header__btn btn btn-thin" + (!ownProfile && following ? " btn-active" : "")}
            onClick={() => onButtonClick()}>{btnName}</button>;
    }

    /**
     * Manages the input/display of the profile's username and description.
     */
    const getCardInfo = () => {
        if (editingMode) {
            return (
                <React.Fragment>
                    <input type="text" className="input-form input-form-thin card__username" disabled placeholder="Username" value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/>
                    <textarea rows={2} className="input-form input-form-thin" placeholder="Description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="card__username">{profile.username}</div>
                    <div className="card__desc">{profile.description}</div>
                </React.Fragment>
            );
        }
    }

    return (
        <React.Fragment>
            <Nav/>
            <div className="profile-header">
                <div className="profile-header__bg">
                    {profile.backgroundURL && <img src={profile.backgroundURL} alt="Profile background"/>}
                    {editingMode &&
                        <label className={"attach-btn background" + (editBackground ? " attach-btn-active" : "")} htmlFor="background-file">
                            <MdPhoto/>
                            <input type="file" id="background-file" onChange={(e) => setEditBackground(e.target.files)}/>
                        </label>
                    }
                </div>
                <div className="profile-header__desc">
                    <div className="profile-img">
                        {profile.profileURL && <img src={profile.profileURL} alt="Profile" height="100" width="100"/>}
                        {editingMode &&
                            <label className={"attach-btn profile" + (editProfile ? " attach-btn-active" : "")} htmlFor="profile-file">
                                <MdPhoto/>
                                <input type="file" id="profile-file" onChange={(e) => setEditProfile(e.target.files)}/>
                            </label>
                        }
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header__count">{profile.followers}<span> followers</span></div>
                            {getCardButton()}
                        </div>
                        {getCardInfo()}
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