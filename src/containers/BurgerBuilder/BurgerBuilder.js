import React, { Component } from 'react';

import Wrapper from '../../Components/hoc/Wrapper';
import Burger from '../../Components/Burger/';

export default class BurgerBuilder extends Component {
    render() {
        return (
            <Wrapper>
                <Burger />
            </Wrapper>
        );
    }
}
