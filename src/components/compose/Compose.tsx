import React, { useState } from 'react';
import { getJSON, IPost } from '../../utils';
import './styles.scss';
import { MdSend } from 'react-icons/md';

/**
 * Represents the new post dialog, handles input
 * and submission of new posts.
 */
const Compose = (props: { op?: IPost }) => {
    const [message, setMessage] = useState("");

    /**
     * Checks whether the new post is a comment 
     * or not and submits it.
     */
    const sendMessage = () => {
        if (message.length === 0) return;

        if (props.op) {
            submitComment();
        } else {
            console.log("askldnaklsd");
            submit();
        }
    }

    /**
     * Submits a new post.
     */
    const submit = () => {
        if (message.length === 0) return;

        getJSON("/api/post/create?" + new URLSearchParams({ message }))
        .then((res) => {
            if (res.status === 200) {
                window.location.href = "/";
            }
        })
        .catch((err) => console.log(err));
    }

    /**
     * Submits a new comment.
     */
    const submitComment = () => {
        getJSON("/api/post/create/comment?" + new URLSearchParams({ pid: props.op!.pid.toString(), uid: props.op!.uid.toString(), message }))
        .then((res) => {
            if (res.status === 200) {
                window.location.href = "/" + props.op!.username + "/post/" + props.op!.pid;
            }
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className="compose">
            <textarea className="input-form" placeholder="Post something" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button className="compose__icon-btn" onClick={() => sendMessage()}><MdSend/></button>
        </div>
    );
}

export default Compose;