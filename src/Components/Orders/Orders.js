import React, { Component } from 'react';
import axios from '../../Axios/Axios';

import Order from './OneOrder/OneOrder';
import Loader from '../UI/Loader/Loader';
import ErrorHanlder from '../UI/ErrorHandler/ErrorHandler';
import Button from '../UI/Button/Button';

import './Orders.scss';

export default class Orders extends Component {
    state = {
        burgerInfomation: null,
        LoadingError: false
    };

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            console.log(response);
            this.setState({ burgerInfomation: response.data });
        });
    }

    removeOrderHandler = id => {
        axios.delete('/orders/' + id + '.json').then(res => {
            axios.get('/orders.json').then(response => {
                this.setState({ burgerInfomation: response.data });
            });
        });
    };

    orderRemoveErrorHandler = () => {
        console.log('1');
    };

    showError = () => {
        this.setState({ LoadingError: true });
    };

    goToMain = () => {
        this.props.history.push('/');
    };

    render() {
        const { burgerInfomation } = this.state;

        const errorHandler = (
            <ErrorHanlder>
                <p>Looks like you have no orders yet</p>
                <Button type="primary" clicked={this.goToMain}>
                    go back and create them
                </Button>
            </ErrorHanlder>
        );

        if (!burgerInfomation) {
            setTimeout(this.showError, 10000);
            return this.state.LoadingError ? errorHandler : <Loader />;
        }

        const userOrders = Object.keys(burgerInfomation).map(order => {
            return (
                <div key={order} className="one-order">
                    <div className="order-price">
                        Burger Price: {burgerInfomation[order].burgerPrice}
                    </div>
                    <Order
                        ingredients={burgerInfomation[order].ingredients}
                        clicked={() => this.removeOrderHandler(order)}
                        orderRemoveError={this.orderRemoveErrorHandler}
                    />
                </div>
            );
        });

        return <div className="orders">{userOrders}</div>;
    }
}
