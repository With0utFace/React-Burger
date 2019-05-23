import React from "react";

import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

const order = props => (
  <>
    <div className="order-wrapper">
      <Burger ingredients={props.ingredients} remove={props.orderRemoveError} />
    </div>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button type="danger" clicked={props.clicked}>
        Remove
      </Button>
    </div>
  </>
);

export default order;
