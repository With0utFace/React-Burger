import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Orders from '../../Components/Orders/Orders';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';

import Layout from '../../Components/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Header from '../../Components/Header/Header';

import './App.css';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />

                <Layout>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={CheckoutForm} />
                </Layout>
            </BrowserRouter>
        );
    }
}
