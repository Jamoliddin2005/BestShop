import React from 'react'
import { Link } from 'react-router-dom'
import Loading2 from '../../components/Loading2/Loading2'
import Brands from '../About/Brands/Brands'
import classes from "./Shop.module.css"

function Shop({ categories, loading }) {

    return (
        <div className={classes.ShoppingPage}>
            <h1>Shopping Page</h1>
            <div className="container">
                <div className={classes.row}>
                    <div className={classes.Left}>
                        <ul>
                            <h4>Gender</h4>
                            <li>
                                <Link to="/product/womans">Womans</Link>
                            </li>
                            <li>
                                <Link to="/product/mens">Mens</Link>
                            </li>
                            <li>
                                <Link to="/product/all">All</Link>
                            </li>
                        </ul>
                        <ul>
                            {loading ? (
                                <>
                                    <h4>Categories</h4>
                                    <div className={classes.LoadingDiv}>
                                        <Loading2 style={{ color: "#9bd85a", textAlign: "left" }} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h4>Categories</h4>
                                    {categories.map((item, index) => (
                                        <li key={index}>
                                            <Link to={`/category/${item._id}`}>{item.name}</Link>
                                        </li>
                                    ))}

                                </>
                            )}
                        </ul>
                    </div>
                    <div className={classes.Right}>
                        <h1>Shopping Right</h1>
                    </div>
                </div>


            </div>
            <Brands />

        </div >
    )
}

export default Shop