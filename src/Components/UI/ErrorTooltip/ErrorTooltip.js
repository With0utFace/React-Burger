import React from 'react';

import '../../../Styles/UI/ErrorTooltip.scss';

const errorTooltip = props => (
    <div className={`clicking-error ${props.isActive ? 'active' : null}`}>
        {props.children}
    </div>
);

export default errorTooltip;
