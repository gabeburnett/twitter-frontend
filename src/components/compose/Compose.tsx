import React from 'react';
import './styles.scss';
import { MdSend } from 'react-icons/md';
const Compose = () => {
    return (
        <div className="compose">
            <textarea className="input-form" placeholder="Post something"/>
            <button className="compose__icon-btn"><MdSend/></button>
        </div>
    );
}

export default Compose;