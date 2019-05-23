import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../Store/actions/index";
import { Redirect } from "react-router-dom";
import { formValidation } from "../../Global/Validation";

import Button from "../UI/Button/Button";
import ErrorHanlder from "../UI/ErrorHandler/ErrorHandler";

import "../../Styles/Components/SignUp.scss";

class SignUp extends Component {
  state = {
    userData: {
      email: {
        value: "",
        validated: false
      },
      password: {
        value: "",
        validated: false
      }
    },
    signUp: true
  };

  changeSignMethod = event => {
    event.preventDefault();
    this.props.onSignMethodChange();
    this.setState(() => {
      return {
        signUp: !this.state.signUp
      };
    });
  };

  onChangeHandler = event => {
    const { userData } = this.state;

    const userDataLenght = Object.keys(userData);

    if (userDataLenght.length === 0) {
      this.setState({ validated: true });
    }

    const prevState = { ...userData };
    prevState[event.target.type].value = event.target.value;

    const validation = formValidation(event.target.type);
    if (!event.target.value.match(validation)) {
      event.target.className = "error-input";
      prevState[event.target.type].validated = false;
    }
    if (event.target.value.match(validation)) {
      event.target.className = "validated-input";
      prevState[event.target.type].validated = true;
    }

    this.setState({ userData: prevState });
  };

  errorMessagesHandler = errorMessage => {
    let message = "";
    switch (errorMessage) {
      case "EMAIL_EXISTS":
        message = "An account with this email already exists";
        break;
      case "INVALID_PASSWORD":
        message = "Your password is incorect";
        break;
      case "EMAIL_NOT_FOUND":
        message = "Your email is incorect";
        break;
      default:
        return message;
    }
    return message;
  };

  handleAuth = event => {
    const { email, password } = this.state.userData;
    event.preventDefault();

    let isValid = email.validated && password.validated;

    if (isValid) {
      this.props.auth(email.value, password.value, this.state.signUp);
    }
  };

  render() {
    const { email, password, signUp } = this.state;

    const signError = this.props.error ? (
      <ErrorHanlder>{this.errorMessagesHandler(this.props.errorMessage)}</ErrorHanlder>
    ) : null;

    return (
      <div>
        <form className="signup-form">
          <input type="email" placeholder="Enter your email" value={email} onChange={this.onChangeHandler} />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.onChangeHandler}
          />
          <Button type="success" clicked={this.changeSignMethod}>
            change to {signUp ? "Sign In" : "Sign Up"}
          </Button>
          <Button type="primary" clicked={this.handleAuth}>
            {signUp ? "Register" : "Login"}
          </Button>
          {signError}
        </form>
        {this.props.isLogged ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    isLogged: state.auth.token !== null,
    errorMessage: state.auth.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isRegister) => dispatch(action.auth(email, password, isRegister)),
    onSignMethodChange: () => dispatch(action.authSignUpMethodChange())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
