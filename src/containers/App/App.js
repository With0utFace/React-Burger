import React, { Component } from 'react';

import Layout from '../../Components/Layout/';
import BurgerBuilder from '../BurgerBuilder/';

import './App.css';

export default class App extends Component {
    render() {
        return (
            <Layout>
                <BurgerBuilder />
            </Layout>
        );
    }
}
