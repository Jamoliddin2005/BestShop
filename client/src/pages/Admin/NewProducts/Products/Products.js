import React from 'react'
import Currency from '../../../../components/Currency/Currency'
import NameLength from '../../../../components/NameLength/NameLength'
import classes from "./Products.module.css"
const Products = ({
    name,
    price,
    photo,
    desc,
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
                    <h3 className={classes.h3} onClick={() => ProductMore(id)}>{NameLength(name, 7)}</h3>
                    <button className={classes.btn} onClick={() => ProductDelete(id)}>Delete</button>
                    <h5 className={classes.price} onClick={() => ProductMore(id)}>{Currency(price)}</h5>
                </div>
                <p className={classes.desc} onClick={() => ProductMore(id)}>{desc}</p>
            </div>
        </div>
    )
}

export default Products