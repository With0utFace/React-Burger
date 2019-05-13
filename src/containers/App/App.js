import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from '../../Components/Layout/Layout';

import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import Orders from '../Orders/Orders';

import Header from '../../Components/Header/Header';

import '../../Styles/Containers/App.scss';

class App extends Component {
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

export default App;
