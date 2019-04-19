import React from 'react';

import './ErrorHandler.scss';

const errorHandler = props => <div className="error">{props.children}</div>;

export default errorHandler;
