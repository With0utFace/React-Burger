import React from 'react';

import './BurgerIngredients.css';

const burgerIngredients = props => {
    let ingredient = null;

    switch (props.type) {
        case 'bread-top':
            ingredient = (
                <div className="bread-top">
                    <div className="seeds-1" />
                    <div className="seeds-2" />
                    <div className="seeds-3" />
                </div>
            );
            break;
        case 'bread-bottom':
            ingredient = <div className="bread-bottom" />;
            break;
        case 'meat':
            ingredient = <div className="meat" />;
            break;
        case 'cheese':
            ingredient = <div className="cheese" />;
            break;
        case 'bacon':
            ingredient = <div className="bacon" />;
            break;
        case 'salad':
            ingredient = <div className="salad" />;
            break;

        default:
            ingredient = null;
    }

    return ingredient;
};

export default burgerIngredients;
