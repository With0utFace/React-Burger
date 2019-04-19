import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';
import AddIngredients from '../../Components/AddIngredients/add-ingredients';
import Button from '../../Components/UI/Button/Button';

import './BurgerBuilder.scss';

export default class BurgerBuilder extends Component {
    INGREDIENT_PRICES = {
        meat: 20,
        bacon: 15,
        cheese: 10,
        salad: 5,
        bread: 3
    };

    state = {
        ingredients: [],
        total: 0
    };

    calcTotalSum = () => {
        const { ingredients } = this.state;
        const prevState = [...ingredients];

        const newTotal = prevState.reduce((current, el) => {
            return (current += this.INGREDIENT_PRICES[el.type]);
        }, 0);
        this.setState({ total: newTotal });
    };

    randomKey = () =>
        Math.random()
            .toString()
            .substr(2, 9);

    addIngredientHandler = type => {
        const newIngredient = {
            id: this.randomKey(),
            type: type
        };
        const prevState = [...this.state.ingredients];
        prevState.push(newIngredient);
        this.setState({ ingredients: prevState });
        setTimeout(this.calcTotalSum, 4);
    };

    removeIngredientHandler = id => {
        const prevState = [...this.state.ingredients];
        const indx = prevState.findIndex(el => el.id === id);
        prevState.splice(indx, 1);
        this.setState({ ingredients: prevState });
        setTimeout(this.calcTotalSum, 4);
    };

    checkIfDisabled = () => {
        return this.state.total === 0 ? true : false;
    };

    sendOrderHandler = () => {
        this.props.history.push('/checkout', this.state);
    };

    render() {
        const { total, ingredients } = this.state;
        return (
            <div className="burger-builder">
                <Burger ingredients={ingredients} remove={this.removeIngredientHandler} />
                <AddIngredients clicked={this.addIngredientHandler} />
                <div className="checkout-summary">
                    <div className="total-price">
                        Total price: <strong>{total}</strong>
                    </div>
                    <Button
                        type="success"
                        disabled={this.checkIfDisabled()}
                        clicked={this.sendOrderHandler}
                    >
                        checkout
                    </Button>
                </div>
            </div>
        );
    }
}
