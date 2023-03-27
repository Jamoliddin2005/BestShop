import React from 'react'
import Currency from '../../../../components/Currency/Currency'
import translate from '../../../../components/translate/translate'
import classes from "./Products.module.css"

const Products = ({
    name_uz,
    name_ru,
    price,
    photo,
    desc_uz,
    desc_ru,
    ProductDelete,
    id,
    ProductMore
}) => {

    return (
        <div className={classes.Products}>
            <div className={classes.photo} onClick={() => ProductMore(id)}>
                <img className={classes.img} src={"/uploads/" + photo[0]} alt="" />
            </div>
            <div className={classes.center}>
                <div className={classes.name_price}>
                    <h3 className={classes.h3} onClick={() => ProductMore(id)}>{translate(name_ru, name_uz)}</h3>
                    <button className={classes.btn} onClick={() => ProductDelete(id)}>Delete</button>
                    <h5 className={classes.price} onClick={() => ProductMore(id)}>{Currency(price)}</h5>
                </div>
                <p className={classes.desc} onClick={() => ProductMore(id)}>{translate(desc_ru, desc_uz)}</p>
            </div>
        </div>
    )
}

export default Products