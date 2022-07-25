import React, { createContext, useState } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  totalAmount: 0,
});

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCartHandler = (item) => {
    const itemInCart = items.find((i) => i.id === item.id);

    if (itemInCart) {
      itemInCart.amount += 1;
    } else {
      item.amount = 1;
      setItems([...items, item]);
    }
    setTotalAmount(totalAmount + item.price);
  };

  const removeItemFromCartHandler = (id) => {
    const itemInCart = items.find((i) => i.id === id);
    if (itemInCart.amount > 1) {
      itemInCart.amount--;
    } else {
      setItems(items.filter((i) => i.id !== id));
    }
    setTotalAmount(totalAmount - itemInCart.price);
  };

  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    totalAmount: totalAmount,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartContext;
