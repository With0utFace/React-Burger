import React from 'react';

import './burger.scss';

const burger = props => {
    let ingredients = props.ingredients.map(ingredient => {
        return (
            <div
                className={ingredient.type}
                type={ingredient.type}
                key={ingredient.id}
                onClick={() => props.remove(ingredient)}
            />
        );
    });

    if (props.ingredients.length <= 0) {
        ingredients = <p>Introduce some ingredients</p>;
    }

    return (
        <div className="burger">
            <div className="bread-top">
                <div className="seeds-1" />
                <div className="seeds-2" />
                <div className="seeds-3" />
            </div>
            {ingredients}
            <div className="bread-bottom" />
        </div>
    );
};

export default burger;
