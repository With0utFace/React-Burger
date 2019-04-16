import React from 'react';

const addIngredients = props => {
    const types = ['bacon', 'meat', 'salad', 'cheese', 'breadMiddle'];

    const buttons = types.map(button => {
        return (
            <button onClick={() => props.clicked(button)} key={button}>
                add {button}
            </button>
        );
    });

    return <div>{buttons}</div>;
};

export default addIngredients;
