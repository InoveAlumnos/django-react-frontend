import { useState, useEffect } from "react"
import styles from "./cart.module.css";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { CartItem } from "../components/cartItem/CartItem";
import { buyAPI } from "../api/buy";

import React from 'react'

const Cart = () => {

  const { cart, setCart } = useContext(CartContext)

  const handleReset = (e) => {
    setCart([])
  }

  const handleBuy = (e) => {
  
    buyAPI.post(cart).then((data) => {
      console.log(data);
      setCart([]);
  });

  }

  return (
    <div className={styles.cartPageContainer}>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
            {
              cart.map((comic) => {
                return(
                  <CartItem comic={comic}/>
                )
              })
            }
        </tbody>
      </table>
      <div className={styles.btnsSection}>
            <div className={styles.btnsContainer}>
              <div onClick={handleBuy} className={styles.buyBtn}>
                <p>Buy</p>
              </div>
              <div onClick={handleReset} className={styles.resetBtn}>
                <p>Reset</p>
              </div>
            </div>
      </div>
    </div>
  )
}


export default Cart;
