import React, { Component } from 'react';
import axios from '../../Axios/Axios';

import Loader from '../UI/Loader/Loader';
import ErrorHanlder from '../UI/ErrorHandler/ErrorHandler';
import ErrorTooltip from '../UI/ErrorTooltip/ErrorTooltip';
import Button from '../UI/Button/Button';

import Order from './OneOrder/OneOrder';

import './Orders.scss';

class Orders extends Component {
    state = {
        burgerInfomation: null,
        LoadingError: false,
        activeError: false
    };

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            if (!response.data) {
                this.setState({ LoadingError: true });
            }

            this.setState({ burgerInfomation: response.data });
        });
    }

    removeOrderHandler = id => {
        axios.delete(`/orders/${id}.json`).then(res => {
            axios.get('/orders.json').then(response => {
                if (!response.data) {
                    this.setState({ LoadingError: true });
                }
                this.setState({ burgerInfomation: response.data });
            });
        });
    };

    orderRemoveErrorHandler = () => {
        this.setState({ activeError: true });
        setTimeout(() => {
            this.setState({ activeError: false });
        }, 3000);
    };

    showError = () => {
        this.setState({ LoadingError: true });
    };

    pushToMain = () => {
        this.props.history.push('/');
    };

    render() {
        const { burgerInfomation } = this.state;

        const errorHandler = (
            <ErrorHanlder>
                <p>Looks like you have no orders yet</p>
                <Button type="primary" clicked={this.pushToMain}>
                    go back and create them
                </Button>
            </ErrorHanlder>
        );

        if (!burgerInfomation) {
            return this.state.LoadingError ? errorHandler : <Loader />;
        }

        const userOrders = Object.keys(burgerInfomation).map(order => {
            return (
                <div key={order} className="one-order">
                    <div className="order-price">
                        Burger Price: {burgerInfomation[order].price}
                    </div>
                    <Order
                        ingredients={burgerInfomation[order].ingredients}
                        clicked={() => this.removeOrderHandler(order)}
                        orderRemoveError={this.orderRemoveErrorHandler}
                    />
                    <ErrorTooltip isActive={this.state.activeError}>
                        Sorry you can't remove ingriendts from active orders
                    </ErrorTooltip>
                </div>
            );
        });

        return <div className="orders">{userOrders}</div>;
    }
}

export default Orders;
