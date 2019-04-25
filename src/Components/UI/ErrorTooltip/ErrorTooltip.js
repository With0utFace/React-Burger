import React from 'react';

import './ErrorTooltip.scss';

const errorTooltip = props => (
    <div className={`clicking-error ${props.isActive ? 'active' : null}`}>
        {props.children}
    </div>
);

export default errorTooltip;
