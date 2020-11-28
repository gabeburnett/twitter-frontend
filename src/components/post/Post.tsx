import React from 'react';
import './styles.scss';

import { MdFavorite, MdChatBubble, MdRepeat } from 'react-icons/md';
import { RiShareBoxLine } from 'react-icons/ri';
import Dialog from '../dialog/Dialog';

interface PostData {
    profileURL: string,
    username: string,
    date: string,
    message: string,
    repost: string
}

// disable scroll example: https://github.com/gabeburnett/portfolio/blob/main/src/components/header/index.tsx
const Post = (props: PostData) => {
    return (
        <React.Fragment>
            {props.repost === "true" &&
                <div className="post-subtext"><MdRepeat/><span>John Reposted</span></div>
            }
            <div className="post">
                <img className="post__profile" src={props.profileURL} alt={props.username + " profile"} width="50" height="50"/>
                <div className="post__header">
                    <div className="post__header__username">{props.username}</div>
                    <div className="post__header__date">{props.date}</div>
                </div>
                <div className="post__message">{props.message}</div>
                <div className="post__interact">
                    <button className="post__interact__btn post__interact__btn-favorite"><MdFavorite/><span>408</span></button>
                    <button className="post__interact__btn post__interact__btn-repost"><MdRepeat/><span>185</span></button>
                    <button className="post__interact__btn post__interact__btn-comment"><MdChatBubble/><span>14</span></button>
                    <button className="post__interact__btn post__interact__btn-share"><RiShareBoxLine/></button>
                </div>
            </div>
            {/* <Dialog title="Reply"/> */}
        </React.Fragment>
    );
}

export default Post;
