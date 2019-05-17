import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../Store/actions/index';
import { Redirect } from 'react-router-dom';

import Button from '../UI/Button/Button';
import ErrorHanlder from '../UI/ErrorHandler/ErrorHandler';

import '../../Styles/Components/SignUp.scss';

class SignUp extends Component {
    state = {
        userData: {
            email: '',
            password: ''
        },
        signUp: true,
        validated: false
    };

    changeSignMethod = event => {
        event.preventDefault();
        this.setState(() => {
            return {
                signUp: !this.state.signUp
            };
        });
    };

    onChangeHandler = event => {
        const { userData } = this.state;

        let validatedInputs = Object.keys(userData).filter(el => {
            return userData[el] === '';
        });

        if (validatedInputs.length === 0) {
            this.setState({ validated: true });
        }

        const prevState = { ...userData };
        const validation = this.formValidationHandler(event.target.type);
        if (!event.target.value.match(validation)) {
            event.target.className = 'error-input';
            this.setState({ validated: false });
            validatedInputs.push(event.target.type);
        }
        if (event.target.value.match(validation)) {
            event.target.className = 'validated-input';
            prevState[event.target.type] = event.target.value;
            this.setState({ userData: prevState });
        }

        console.log(validatedInputs);
    };

    formValidationHandler(type) {
        let pattern = null;
        switch (type) {
            case 'text':
                pattern = /[a-zA-Z]*/g;
                break;
            case 'email':
                pattern = /.{3,}?@.+[.].+/g;
                break;
            case 'password':
                pattern = /^.{6,20}$/g;
                break;
            default:
                pattern = /[a-zA-Z]*/g;
                break;
        }

        return pattern;
    }

    handleAuth = event => {
        event.preventDefault();

        const { email, password } = this.state.userData;

        if (this.state.validated) {
            this.props.auth(email, password, this.state.signUp);
        }
    };

    render() {
        const { email, password, signUp } = this.state;

        const signError = this.props.error ? (
            <ErrorHanlder>
                {this.state.signUp
                    ? 'complete all fields'
                    : 'Email or Password are incorect'}
            </ErrorHanlder>
        ) : null;

        return (
            <div>
                <form className="signup-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={this.onChangeHandler}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={this.onChangeHandler}
                    />
                    <Button type="success" clicked={this.changeSignMethod}>
                        change to {signUp ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <Button type="primary" clicked={this.handleAuth}>
                        {signUp ? 'Register' : 'Login'}
                    </Button>
                </form>
                {signError}
                {this.props.isLogged ? <Redirect to="/" /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isLogged: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isRegister) =>
            dispatch(action.auth(email, password, isRegister))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
