import React from 'react'
import classes from "./ClientPage.module.css"
const ClientPage = ({ user }) => {
    console.log(user);
    return (
        <div className='container'>
            <div className={classes.left}>
                <img src={user.avatar} alt={user.avatar} className={classes.image} />
                <h3>{user.fullName}</h3>
            </div>
        </div>
    )
}

export default ClientPage