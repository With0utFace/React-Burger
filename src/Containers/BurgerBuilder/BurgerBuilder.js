import React, { Component } from "react";
import { connect } from "react-redux";
import { addIngredients, removeIngredient } from "../../Store/actions";

import Burger from "../../Components/Burger/Burger";
import Button from "../../Components/UI/Button/Button";
import AddIngredients from "../../Components/AddIngredients/add-ingredients";

import "../../Styles/Containers/BurgerBuilder.scss";

class BurgerBuilder extends Component {
  randomKey = () =>
    Math.random()
      .toString()
      .substr(2, 9);

  addIngredientHandler = type => {
    const newIngredient = {
      id: this.randomKey(),
      type: type
    };

    this.props.addIngredients(newIngredient);
  };

  checkIfDisabled = () => {
    return this.props.price === 0 ? true : false;
  };

  sendOrderHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const { price, ingredients, removeIngredient } = this.props;
    return (
      <div className="burger-builder">
        <Burger ingredients={ingredients} remove={removeIngredient} />
        <div className="burger-controls">
          <AddIngredients clicked={this.addIngredientHandler} />
          <div className="checkout-summary">
            <div className="total-price">
              Total price: <strong>{price}</strong> $
            </div>
            <Button type="success" disabled={this.checkIfDisabled()} clicked={this.sendOrderHandler}>
              checkout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredients: ingredient => dispatch(addIngredients(ingredient)),
    removeIngredient: ingredient => dispatch(removeIngredient(ingredient))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);
