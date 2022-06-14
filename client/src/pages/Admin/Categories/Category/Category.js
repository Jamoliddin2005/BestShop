import React from 'react'
import classes from "./Category.module.css"

const Category = ({ name, photo, deleteCategory, id, getCategory }) => {
    return (
        <div className={classes.category}>
            <div className={classes.imageDiv} onClick={() => getCategory(id)}>
                <img className={classes.image} src={`/uploads/${photo}`} alt="" />
            </div>
            <h4 className={classes.name} onClick={() => getCategory(id)}>{name}</h4>
            <button className={classes.button} onClick={() => getCategory(id)}>GO SHOP</button>
            <button className={classes.button} onClick={(e) => deleteCategory(id)}>Delete</button>
        </div>
    )
}

export default Category