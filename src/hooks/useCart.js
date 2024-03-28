import { useEffect, useState } from "react";
import { db } from "../data/db";

export const useCart = () => {
  const initialState = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialState);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  function addToCart(item) {
    // Buscar si el artículo ya existe en el carrito
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists !== -1) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      // Si el artículo ya existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++; // Incrementar la cantidad del artículo existente
      setCart(updatedCart);
    } else {
      // Si el artículo no existe en el carrito
      item.quantity = 1;
      setCart([...cart, item]); // Agregar el artículo al carrito
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaceQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaceQuantity,
    clearCart,
  };
};
