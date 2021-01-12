import React, { useEffect } from 'react';
import './styles.scss';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { MdClose } from 'react-icons/md';
import Compose from '../compose/Compose';
import { IPost } from '../../utils';

/**
 * Reply dialog popup. Uses the compose compoent to create a comment/reply to another post.
 */
const ReplyDialog = (props: { op: IPost, onExit: React.Dispatch<React.SetStateAction<boolean>> }) => {

    /**
     * Close this dialog, by changing a state in its parent component.
     */
    const onESC = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
            props.onExit(false);
        }
    }

    /**
     * Manages ESC key listener and vertical scrolling.
     */
    useEffect(() => {
        const elm = document.querySelector("body")!;
        disableBodyScroll(elm);
        document.addEventListener("keydown", onESC, false);

        return () => {
            enableBodyScroll(elm);
            document.removeEventListener("keydown", onESC, false);
        }
    })

    return (
        <React.Fragment>
            <div className="dialog">
                <div className="new-reply">
                    <div className="new-reply__title">Reply to {props.op.username}</div>
                    <MdClose className="new-reply__exit-btn" onClick={() => props.onExit(false)}/>
                    <Compose op={props.op}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ReplyDialog;