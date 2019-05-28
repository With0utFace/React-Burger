import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../Store/actions/index';

import '../../Styles/Components/Header.scss';
import logo from '../../Assets/logo.jpg';

class Header extends Component {
    logOutHandler = () => {
        if (this.props.isLogged) {
            this.props.logOut();
        }
    };
    render() {
        return (
            <div className="header">
                <div className="header-navigation">
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
                <div className="header-logo">
                    <div className="logo-wrapper">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
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
