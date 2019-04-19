import React from 'react';

import Button from '../UI/Button/Button';

const addIngredients = props => {
    const types = ['bacon', 'meat', 'salad', 'cheese', 'bread'];

    const buttons = types.map(button => {
        return (
            <Button clicked={() => props.clicked(button)} key={button} type="ingredient-btn">
                add {button}
            </Button>
        );
    });

    return <div className="add-ingridients">{buttons}</div>;
};

export default addIngredients;
