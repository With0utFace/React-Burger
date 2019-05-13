import React, { Component } from 'react';
import axios from '../../Axios/Axios';
import { connect } from 'react-redux';
import { clearState } from '../../Store/actions';

import Button from '../UI/Button/Button';
import ErrorHanlder from '../UI/ErrorHandler/ErrorHandler';

import '../../Styles/Components/CheckOutForm.scss';

class CheckoutForm extends Component {
    state = {
        customerInformation: {
            name: '',
            city: '',
            email: ''
        },
        validated: false,
        noIngredients: false
    };

    onChange = event => {
        const { customerInformation } = this.state;

        const prevState = { ...customerInformation };
        const validation = this.formValidationHandler(event.target.type);
        if (!event.target.value.match(validation)) {
            event.target.className = 'error-input';
        }
        if (event.target.value.match(validation)) {
            event.target.className = 'validated-input';
            prevState[event.target.name] = event.target.value;
            this.setState({ customerInformation: prevState });
        }

        let validatedInputs = Object.keys(customerInformation).filter(el => {
            return customerInformation[el] === '';
        });

        if (validatedInputs.length === 0) {
            this.setState({ validated: true });
        }
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

            default:
                pattern = /[a-zA-Z]*/g;
                break;
        }

        return pattern;
    }

    orderBurger = event => {
        event.preventDefault();

        if (this.props.ingredients.length === 0) {
            this.setState({ noIngredients: true });
        }
        if (this.state.validated && this.props.ingredients.length > 0) {
            axios
                .post(`orders.json?auth=${this.props.token}`, {
                    ingredients: this.props.ingredients,
                    customer: this.state.customerInformation,
                    price: this.props.price
                })
                .then(res => {
                    this.props.clearIngredients();
                    this.props.history.push('/orders');
                });
        }
    };

    pushToMain = () => {
        this.props.history.push('/');
    };

    render() {
        const { customerInformation, noIngredients } = this.state;

        if (noIngredients) {
            return (
                <ErrorHanlder>
                    <p>
                        Sorry but you can't order a burger, without ingredients
                    </p>
                    <Button type="primary" clicked={this.pushToMain}>
                        go back and add some
                    </Button>
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
