import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../Store/actions/';

import Layout from '../../Components/Layout/Layout';

import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import Orders from '../Orders/Orders';
import SignUpForm from '../../Components/SignUp/SignUp';

import Header from '../../Components/Header/Header';

import '../../Styles/Containers/App.scss';

class App extends Component {
    componentDidMount() {
        this.props.token();
    }
    render() {
        return (
            <BrowserRouter>
                <Header />

                <Layout>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={CheckoutForm} />
                    <Route path="/signup" component={SignUpForm} />
                </Layout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        token: () => dispatch(action.getLocalToken())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
