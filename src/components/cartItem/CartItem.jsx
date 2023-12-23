import React from 'react'
import styles from "../../pages/cart.module.css"

export const CartItem = (props) => {
  return (
    <tr className={styles.cartItem}>
        <td><img src={props.comic.picture} alt="" /></td>
        <td><p>{props.comic.title}</p></td>
        <td><p>U$D {props.comic.price}</p></td>
        <td><p>{props.comic.qty}</p></td>
    </tr>
  )
}
