import React from 'react';

import './Button.scss';

const button = props => (
    <button
        className={'component-btn ' + props.type}
        onClick={props.clicked}
        disabled={props.disabled}
    >
        {props.children}
    </button>
);

export default button;
