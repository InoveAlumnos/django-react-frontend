import React, {useContext, useState} from "react";
import { CartContext } from '../../context/cartContext'
import styles from "./addToCartBtn.module.css"

const AddToCartBtn = (props) => {
    
    const { cart, setCart } = useContext(CartContext)
    

    const handleClick = () => {
        setCart((prevCart) => {
            const existingComic = prevCart.find((comic) => comic.marvel_id === props.comic.marvel_id);
    
            if (existingComic) {
                return prevCart.map((comic) =>
                    comic.marvel_id === props.comic.marvel_id
                        ? ({ ...comic, qty: comic.qty + 1 })
                        : comic
                );
            } else {
                return [...prevCart, { ...props.comic, qty: 1 }];
            }
        });
    };
    

  return (
    <div onClick={handleClick} className={styles.addBtnContainer}>
        <p className={styles.addBtn}>+</p>
    </div>
  )
}

export default AddToCartBtn