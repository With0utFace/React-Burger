import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../Store/actions/index';

import '../../Styles/Components/Header.scss';

class Header extends Component {
    logOutHandler = () => {
        if (this.props.isLogged) {
            this.props.logOut();
        }
    };
    render() {
        return (
            <div className="header">
                <NavLink exact to="/">
                    Burger Builder
                </NavLink>
                {this.props.isLogged ? (
                    <NavLink to="/orders">Orders</NavLink>
                ) : null}
                <NavLink to="/signup" onClick={this.logOutHandler}>
                    {this.props.isLogged ? 'Logout' : 'Sign Up'}
                </NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(action.logOut())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
