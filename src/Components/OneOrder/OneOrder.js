import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const order = props => (
    <div>
        <Burger ingredients={props.ingredients} remove={props.orderRemoveError} />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="danger" clicked={props.clicked}>
                Remove
            </Button>
        </div>
    </div>
);

export default order;
