import React, { Component } from 'react';
import axios from '../../Axios/Axios';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';

import './CheckOutForm.scss';

class CheckoutForm extends Component {
    state = {
        customerInformation: {
            name: '',
            city: '',
            email: ''
        }
    };

    onChange = event => {
        const prevState = { ...this.state.customerInformation };
        const validation = this.formValidationHandler(event.target.type);
        if (event.target.value.match(validation)) {
            console.log(2);
            prevState[event.target.name] = event.target.value;
        }

        this.setState({ customerInformation: prevState });
    };

    formValidationHandler(type) {
        let pattern = null;
        switch (type) {
            case 'text':
                pattern = /[a-zA-Z]*/g;
                break;
            case 'email':
                pattern = /.+@.*/g;
                break;

            default:
                pattern = /[a-zA-Z]*/g;
                break;
        }

        return pattern;
    }

    orderBurger = event => {
        event.preventDefault();
        axios
            .post('/orders.json/', {
                ingredients: this.props.ingredients,
                customer: this.state.customerInformation,
                price: this.props.price
            })
            .then(response => {
                this.props.history.push('/orders');
            });
    };

    render() {
        const { customerInformation } = this.state;
        if (this.props.ingredients) {
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
        return <div>no data</div>;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(CheckoutForm);
