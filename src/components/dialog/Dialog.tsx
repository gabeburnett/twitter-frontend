import React from 'react';
import './styles.scss';

const Dialog = (props: any) => (
    <div className="dialog-wrapper">
        <div className="dialog">
            <div className="dialog__title">{props.title}</div>
            <div className="dialog__body">
                {props.children} asasd
            </div>
            <div className="dialog__nav">
                <button className="btn">Close</button>
            </div>
        </div>
    </div>
);

export default Dialog;