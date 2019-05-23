import React from "react";

import "../../Styles/Components/Burger.scss";

const burger = props => {
  let ingredients = props.ingredients.map(ingredient => {
    return (
      <div
        className={"ingregient " + ingredient.type}
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
      <div className="ingregient bread-top" />
      {ingredients}
      <div className="ingregient bread-bottom" />
    </div>
  );
};

export default burger;
