import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

import Burger from '../../Components/Burger/Burger';
import Button from '../../Components/UI/Button/Button';
import AddIngredients from '../../Components/AddIngredients/add-ingredients';

import '../../Styles/Containers/BurgerBuilder.scss';

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
        this.props.history.push('/checkout');
    };

    render() {
        const { price, ingredients, removeIngredient } = this.props;
        return (
            <div className="burger-builder">
                <Burger ingredients={ingredients} remove={removeIngredient} />
                <AddIngredients clicked={this.addIngredientHandler} />
                <div className="checkout-summary">
                    <div className="total-price">
                        Total price: <strong>{price}</strong>
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredients: ingredient =>
            dispatch({ type: actionType.ADD_INGREDIENTS, ingredient: ingredient }),
        removeIngredient: ingredient =>
            dispatch({ type: actionType.REMOVE_INGREDIENT, ingredient: ingredient })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BurgerBuilder);
