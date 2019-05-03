import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../Styles/Components/Header.scss';

const header = props => (
    <div className="header">
        <NavLink exact to="/">
            Burger Builder
        </NavLink>
        <NavLink to="/orders">Orders</NavLink>
    </div>
);

export default header;
