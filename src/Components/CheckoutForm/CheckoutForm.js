import React, { Component } from 'react';
import axios from '../../Axios/Axios';

import Button from '../UI/Button/Button';

import './CheckOutForm.scss';

class CheckoutForm extends Component {
    state = {
        ingredients: null,
        customerInformation: {
            name: '',
            city: '',
            street: ''
        },
        burgerPrice: ''
    };

    componentDidMount() {
        const historyState = this.props.history.location.state;
        this.setState({
            ingredients: historyState.ingredients,
            burgerPrice: historyState.total
        });
    }

    onChange = event => {
        const prevState = { ...this.state.customerInformation };
        prevState[event.target.name] = event.target.value;

        this.setState({ customerInformation: prevState });
    };

    orderBurger = event => {
        event.preventDefault();
        axios.post('/orders.json/', this.state).then(response => {
            this.props.history.push('/orders');
        });
    };

    render() {
        const { customerInformation, ingredients } = this.state;
        if (ingredients) {
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
                            type="text"
                            placeholder="Enter your Street"
                            value={customerInformation.street}
                            name="street"
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

export default CheckoutForm;
