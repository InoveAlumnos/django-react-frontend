import React, {useContext, useState} from "react";
import { CartContext } from '../../context/cartContext'
import styles from "../addToCartBtn/addToCartBtn.module.css"

const RemoveFromCartBtn = (props) => {
    
    const { cart, setCart } = useContext(CartContext)

    const [isDisabled, setIsDisabled] = useState(props.comic.qty > 0);
    
    const handleClick = () => {
        setCart((prevCart) => {
            const existingComic = prevCart.find((comic) => comic.marvel_id === props.comic.marvel_id);
    
            if (existingComic) {
                if (existingComic.qty > 1) {
                    return prevCart.map((comic) =>
                        comic.marvel_id === props.comic.marvel_id
                            ? { ...comic, qty: comic.qty - 1 }
                            : comic
                    );
                } else {
                    return prevCart.filter((comic) => comic.marvel_id !== props.comic.marvel_id);
                }
            } else {
                return prevCart;
            }
        });
    };
    

    return (
        <button onClick={handleClick} disabled={isDisabled} className={styles.removeBtn}>-</button>
    )
}

export default RemoveFromCartBtn