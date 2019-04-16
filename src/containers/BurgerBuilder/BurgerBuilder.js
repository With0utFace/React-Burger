import React, { Component } from 'react';

import Wrapper from '../../Components/hoc/Wrapper';
import Burger from '../../Components/Burger/';
import AddIngredients from '../../Components/AddIngredients/add-ingredients';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [],
        total: 0,
        prices: {
            meat: 20,
            bacon: 15,
            cheese: 10,
            salad: 5,
            breadMiddle: 3
        }
    };

    calcTotalSum = () => {
        const { prices, ingredients } = this.state;
        const prevState = [...ingredients];

        const newTotal = prevState.reduce((current, el) => {
            return (current += prices[el.type]);
        }, 0);

        console.log(newTotal);
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

    render() {
        const { total, ingredients } = this.state;
        return (
            <Wrapper>
                <Burger ingredients={ingredients} remove={this.removeIngredientHandler} />
                <AddIngredients clicked={this.addIngredientHandler} />
                {total}
            </Wrapper>
        );
    }
}
