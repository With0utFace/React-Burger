import React from "react";

import "../../../Styles/UI/ErrorHandler.scss";

const errorHandler = props => <div className={"error " + props.className}>{props.children}</div>;

export default errorHandler;
