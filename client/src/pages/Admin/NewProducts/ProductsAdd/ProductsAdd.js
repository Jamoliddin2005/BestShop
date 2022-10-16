import React from 'react'
import classes from "./ProductsAdd.module.css"
const ProductsAdd = ({
    setName,
    setPrice,
    setDesc,
    setCategoryId,
    setPhoto,
    CreateProductHandler,
    name,
    price,
    desc,
    categoryId,
    photoone,
    setPhotoOne,
    loading,
    setLoading,
    contacts,
    setContacts,
    gender,
    setGender
}) => {


    const imageHandler = (e) => {
        setPhoto(e.target.files)
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPhotoOne(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const deleteImages = (e) => {
        setPhoto("")
        setPhotoOne("https://bref.sh/img/logo-null.png")
    }



    return (
        <div className={classes.ProductsAdd}>
            <h1 className={classes.title}>New Products</h1>
            <form className={classes.form} encType="multipart/form-data">
                <label className={classes.label} htmlFor="ProductName">Product Name</label>
                <input className={classes.input} type="text" name="name" id="ProductName" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} required />
                <label className={classes.label} htmlFor="ProductPrice">Product Price</label>
                <input className={classes.input} type="number" name="price" id="ProductPrice" placeholder='Product Price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                <label className={classes.label} htmlFor="ProductDesc">Product Description</label>
                <input className={classes.input} type="text" name="desc" id="ProductDesc" placeholder='Product Description' value={desc} onChange={(e) => setDesc(e.target.value)} required />
                <label className={classes.label} htmlFor="categoryId">Product Category</label>
                <div className={classes.categoryDiv}>
                    {loading ?
                        <h3 className={classes.textLoading}>Loading...</h3> :
                        <select className={classes.input} name="categoryId" id="categoryId" onChange={(e) => setCategoryId(e.target.value)} required>
                            <option hidden>Category</option>
                            {contacts.map((item, index) => (
                                <option key={index} value={item._id} id={item._id}>{item.name}</option>
                            ))}
                        </select>
                    }
                </div>
                <label className={classes.label} htmlFor="gender">Gender</label>
                <div className={classes.categoryDiv}>
                    {loading ?
                        <h3 className={classes.textLoading}>Loading...</h3> :
                        <select className={classes.input} name="gender" id="gender" onChange={(e) => setGender(e.target.value)} required>
                            <option hidden>Gender</option>
                            <option value="Woman">Woman</option>
                            <option value="Baby">Baby</option>
                            <option value="Man">Man</option>
                            <option value="All">All</option>
                        </select>
                    }
                </div>
                <label className={classes.label} htmlFor="ProductPhoto">Product Photo</label>
                <input className={classes.input} type="file" accept='image/*' multiple name="photo" id="ProductPhoto" onChange={imageHandler} required />
                <button className={classes.btn} type='button' onClick={CreateProductHandler}>Create Product</button>
                <div className={classes.images}>
                    <img src={photoone} alt="" className={classes.img} />
                    <button type='reset' className={classes.hover} onClick={deleteImages} >
                        <i className="fa-solid fa-trash-can deleteIcon"></i>
                    </button>
                </div>
            </form >
        </div >
    )
}

export default ProductsAdd