import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdFavorite, MdChatBubble, MdRepeat } from 'react-icons/md';
import { RiShareBoxLine } from 'react-icons/ri';
import ReplyDialog from './ReplyDialog';
import { jsonRequest, IPost } from '../../utils';
import './styles.scss';

/**
 * Represents the post component, which also handles the like and reposting buttons.
 */
const Post = (props: { data: IPost}) => {
    const [likes, setLikes] = useState(Number(props.data.likes));
    const [reposts, setReposts] = useState(Number(props.data.reposts));
    const [hasLiked, setHasLiked] = useState(props.data.hasLiked);
    const [hasReposted, setHasReposted] = useState(props.data.hasReposted);
    const [hasReplyWindow, setReplyWindow] = useState(false);
    
    const onLikeClick = () => {
        jsonRequest(hasLiked ? "DELETE" : "POST", "/api/post/like", { pid: String(props.data.pid), uid: String(props.data.uid) });
        setLikes(likes + (hasLiked ? -1 : 1));
        setHasLiked(!hasLiked);
    }

    const onRepostClick = () => {
        jsonRequest(hasReposted ? "DELETE" : "POST", "/api/post/repost", { pid: String(props.data.pid), uid: String(props.data.uid) });
        setReposts(reposts + (hasReposted ? -1 : 1));
        setHasReposted(!hasReposted);
    }

    return (
        <React.Fragment>
            {props.data.repostUsername &&
                <div className="post-subtext"><MdRepeat/><span>{props.data.repostUsername} Reposted</span></div>
            }
            <div className="post">
                <Link to={"/" + props.data.username }>
                    <img className="post__profile" src={props.data.profileURL} alt={props.data.username + " profile"} width="50" height="50"/>
                </Link>
                <div className="post__header">
                    <Link to={"/" + props.data.username }>
                        <div className="header__username">{props.data.username}</div>
                    </Link>
                    <Link to={"/" + props.data.username + "/post/" + props.data.pid}>
                        <div className="header__date">{props.data.date}</div>
                    </Link>
                </div>
                <div className="post__message">{props.data.message}</div>
                <div className="post__interact">
                    <button className={"interact-btn" + (hasLiked ? " interact-btn-active" : "")} onClick={() => onLikeClick()}>
                        <MdFavorite/><span>{likes}</span>
                    </button>
                    <button className={"interact-btn" + (hasReposted ? " interact-btn-active" : "")} onClick={() => onRepostClick()}>
                        <MdRepeat/><span>{reposts}</span>
                    </button>
                    <button className="interact-btn" onClick={() => setReplyWindow(true)}><MdChatBubble/><span>{props.data.comments}</span></button>
                    <button className="interact-btn"><RiShareBoxLine/></button>
                </div>
            </div>
            {hasReplyWindow &&
                <ReplyDialog op={props.data} onExit={setReplyWindow}/>
            }
        </React.Fragment>
    );
}

export default Post;