import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import styles from "./comicCards.module.css"
import { exampleResponse } from "./responseExample.js"
import magnifying_glass_logo from "../../assets/img/magnifying_glass_logo.png"

import {ComicsGetAPI} from "../../api/ComicsGetAPI"

const ComicCards = (props) => {
    const { setAuthHook, userDataHook} = props;
    const [comics, SetComics] = useState("CARGANDO...");

    const navigate = useNavigate();

    useEffect(() => {
        const item = JSON.parse(sessionStorage.getItem('userDataEcommerce'));

        if(item) {
            setAuthHook(true);
            userDataHook(item);
            ComicsGetAPI.getAll().then((data) => {
                console.log(data);
                SetComics(data);
            });
        }
        else {
            navigate("/user");
        }

    }, [])

    return (
        <div className={styles.container}>
            {   Array.isArray(comics)?
                comics.map((comicData, idx) => {
                return (
                    <div className={styles.comicCards} key={idx}>
                        <div className={styles.flipBox}>
                            <div className={styles.flipBoxInner}>
                                <div className={styles.flipBoxFront}>
                                    <img className={comicData.stock_qty > 0 ? styles.picture : styles.PictureSoldOut} src={comicData.picture} alt={comicData.title}></img>
                                </div>
                                <div className={styles.flipBoxBack}>
                                    <img className={styles.backPicture} src={magnifying_glass_logo} alt={"magnify"}></img>
                                </div>
                            </div>
                        </div>
                        <div className={comicData.stock_qty > 0 ? styles.cardDescription : styles.soldOutDescription}>
                            <h3 className={styles.cardTitle}>{comicData.title.length > 50 ? comicData.title.substring(0, 40) + " ..." : comicData.title}</h3>
                            <h3 className={comicData.stock_qty > 0 ? styles.cardPrice : styles.priceSoldOut}>{comicData.stock_qty > 0 ? "U$S " + comicData.price : "SOLD OUT"}</h3>
                        </div>
                    </div>
                );
            })
            :
            comics
        }
        </div>
    )
}

export default ComicCards;