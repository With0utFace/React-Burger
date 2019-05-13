import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrdersToState, removeOrder } from '../../Store/actions';

import Loader from '../../Components/UI/Loader/Loader';
import ErrorHanlder from '../../Components/UI/ErrorHandler/ErrorHandler';
import ErrorTooltip from '../../Components/UI/ErrorTooltip/ErrorTooltip';
import Button from '../../Components/UI/Button/Button';

import Order from '../../Components/OneOrder/OneOrder';

import '../../Styles/Components/Orders.scss';

class Orders extends Component {
    state = {
        activeError: false
    };

    componentDidMount() {
        this.props.getOrders();
    }

    removeOrderHandler = id => {
        this.props.removeOrder(id);
    };

    orderRemoveErrorHandler = () => {
        this.setState({ activeError: true });
        setTimeout(() => {
            this.setState({ activeError: false });
        }, 3000);
    };

    pushToMain = () => {
        this.props.history.push('/');
    };

    render() {
        const { orders, loading } = this.props;

        const errorHandler = (
            <ErrorHanlder>
                <p>Looks like you have no orders yet</p>
                <Button type="primary" clicked={this.pushToMain}>
                    go back and create them
                </Button>
            </ErrorHanlder>
        );

        if (loading) {
            return <Loader />;
        }

        if (!orders) {
            return errorHandler;
        }

        const userOrders = Object.keys(orders).map(order => {
            return (
                <div key={order} className="one-order">
                    <div className="order-price">Burger Price: {orders[order].price}</div>
                    <Order
                        ingredients={orders[order].ingredients}
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

const mapStateToProps = state => {
    return {
        orders: state.orders,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(fetchOrdersToState()),
        removeOrder: id => dispatch(removeOrder(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);
