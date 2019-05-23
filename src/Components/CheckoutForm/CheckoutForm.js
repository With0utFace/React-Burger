import React, { Component } from "react";
import axios from "../../Axios/Axios";
import { connect } from "react-redux";
import { clearState } from "../../Store/actions";
import { formValidation } from "../../Global/Validation";

import Button from "../UI/Button/Button";
import ErrorHanlder from "../UI/ErrorHandler/ErrorHandler";

import "../../Styles/Components/CheckOutForm.scss";

class CheckoutForm extends Component {
  state = {
    customerInformation: {
      name: "",
      city: "",
      email: ""
    },
    validated: false,
    noIngredients: false,
    loginError: false
  };

  onChange = event => {
    const { customerInformation } = this.state;

    const prevState = { ...customerInformation };
    const validation = formValidation(event.target.type);
    if (!event.target.value.match(validation)) {
      event.target.className = "error-input";
    }
    if (event.target.value.match(validation)) {
      event.target.className = "validated-input";
      prevState[event.target.name] = event.target.value;
      this.setState({ customerInformation: prevState });
    }

    let validatedInputs = Object.keys(customerInformation).filter(el => {
      return customerInformation[el] === "";
    });

    if (validatedInputs.length === 0) {
      this.setState({ validated: true });
    }
  };

  orderBurger = event => {
    event.preventDefault();
    const { token, ingredients, price } = this.props;

    if (ingredients.length === 0) {
      this.setState({ noIngredients: true });
    }

    if (!this.props.token) {
      this.setState({ loginError: true });
    }
    if (this.state.validated && ingredients.length > 0 && this.props.token !== null) {
      axios
        .post(`orders.json?auth=${token}`, {
          ingredients: ingredients,
          customer: this.state.customerInformation,
          price: price
        })
        .then(res => {
          this.props.clearIngredients();
          this.props.history.push("/orders");
        });
    }
  };

  pushToMain = () => {
    this.props.history.push("/");
  };

  render() {
    const { customerInformation, noIngredients, loginError } = this.state;
    let loginErrorMessage = null;
    if (noIngredients) {
      return (
        <ErrorHanlder>
          <p>Sorry but you can't order a burger, without ingredients</p>
          <Button type="primary" clicked={this.pushToMain}>
            go back and add some
          </Button>
        </ErrorHanlder>
      );
    }

    if (loginError) {
      loginErrorMessage = (
        <ErrorHanlder>
          <p>You must be logged in to order a burger</p>
        </ErrorHanlder>
      );
    }

    return (
      <div className="check-out-form">
        <form onSubmit={this.orderBurger}>
          <input
            type="text"
            placeholder="Enter your name"
            value={customerInformation.name}
            name="name"
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Enter your City"
            value={customerInformation.city}
            name="city"
            onChange={this.onChange}
          />
          <input
            type="email"
            placeholder="Enter your Email"
            value={customerInformation.street}
            name="email"
            onChange={this.onChange}
          />
          <Button type="primary">Order Burger</Button>
          {loginErrorMessage}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    token: state.auth.token
  };
};

const mapDispathToProps = dispatch => {
  return {
    clearIngredients: () => dispatch(clearState())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CheckoutForm);
