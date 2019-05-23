import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrdersToState, removeOrder, getLocalToken } from "../../Store/actions";
import { Redirect } from "react-router-dom";

import Loader from "../../Components/UI/Loader/Loader";
import ErrorHanlder from "../../Components/UI/ErrorHandler/ErrorHandler";
import Button from "../../Components/UI/Button/Button";

import Order from "../../Components/OneOrder/OneOrder";

import "../../Styles/Components/Orders.scss";

class Orders extends Component {
  state = {
    activeError: false
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.getOrders(this.props.orders);
    }
  }

  removeOrderHandler = id => {
    this.props.removeOrder(id, this.props.token);
  };

  pushToMain = () => {
    this.props.history.push("/");
  };

  render() {
    const { orders, loading, token } = this.props;

    let userOrders = null;

    if (!token) {
      return <Redirect to="/" />;
    }

    if (loading) {
      return (userOrders = <Loader />);
    }

    if (!orders) {
      return (userOrders = (
        <ErrorHanlder className="no-items">
          <p>Looks like you have no orders yet</p>
          <Button type="primary" clicked={this.pushToMain}>
            go back and create them
          </Button>
        </ErrorHanlder>
      ));
    }

    userOrders = Object.keys(orders).map(order => {
      return (
        <div key={order} className="one-order">
          <div className="order-price">
            Burger Price: <strong>{orders[order].price}</strong>{" "}
          </div>
          <Order
            ingredients={orders[order].ingredients}
            clicked={() => this.removeOrderHandler(order)}
            orderRemoveError={() => {}}
          />
        </div>
      );
    });

    return <div className="orders">{userOrders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(fetchOrdersToState()),
    removeOrder: (id, token) => dispatch(removeOrder(id, token)),
    getToken: () => dispatch(getLocalToken())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
