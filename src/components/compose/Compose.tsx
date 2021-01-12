import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IPost } from '../../utils';
import './styles.scss';
import { MdSend } from 'react-icons/md';
import Cookies from 'js-cookie';

/**
 * Represents the new post dialog, handles input
 * and submission of new posts.
 */
const Compose = (props: { op?: IPost }) => {
    const [message, setMessage] = useState("");
    const history = useHistory();

    /**
     * Checks whether the new post is a comment 
     * or not and submits it.
     */
    const sendMessage = () => {
        if (message.length === 0) return;

        if (props.op) {
            submitComment();
        } else {
            submit();
        }
    }

    /**
     * Submits a new post.
     */
    const submit = () => {
        if (message.length === 0) return;

        fetch("http://localhost:3000/api/post/create?" + new URLSearchParams({ message }), {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "*",
                    "Authorization": "Bearer " + Cookies.get("jwtToken"),
                    "Content-Type": "application/json; charset=utf-8" },
        }).then((res) => {
            if (res.status === 200) {
                setMessage("");
                history.push("/");
            }
        }).catch((err) => console.log(err));
    }

    /**
     * Submits a new comment.
     */
    const submitComment = () => {
        fetch("http://localhost:3000/api/post/create/comment?" + new URLSearchParams({ pid: props.op!.pid.toString(), uid: props.op!.uid.toString(), message }), {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "*",
                    "Authorization": "Bearer " + Cookies.get("jwtToken"),
                    "Content-Type": "application/json; charset=utf-8" },
        }).then((res) => {
            if (res.status === 200) {
                history.push("/" + props.op!.username + "/post/" + props.op!.pid);
            }
        }).catch((err) => console.log(err));
    }

    return (
        <div className="compose">
            <textarea className="input-form" placeholder="Post something" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button className="compose__icon-btn" onClick={() => sendMessage()}><MdSend/></button>
        </div>
    );
}

export default Compose;