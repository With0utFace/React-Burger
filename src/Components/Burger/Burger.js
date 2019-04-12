import React from 'react';
import BurgerIngredient from './BurgerIngredients/';

import './Burger.css';

const burger = props => {
    return (
        <div className="burger">
            <BurgerIngredient type="bread-top" />
            <BurgerIngredient type="salad" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
