import React from 'react'
import classes from "./CategoryAdd.module.css"
const CategoryAdd = ({ name, photo, setName, setPhoto, onSubmitHandler, photoone,
    setPhotoOne, }) => {


    const imageHandler = (e) => {
        setPhoto(e.target.files[0])
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
        <>
            <form className={classes.form} encType="multipart/form-data">
                <label className={classes.label} htmlFor="name">Category Name</label>
                <input className={classes.input} type="text" name="name" id="name" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <label className={classes.label} htmlFor="photoInputAdd">Category Image</label>
                <input className={classes.input} type="file" accept="image/*" name="photo" id="photoInputAdd" required onChange={imageHandler} />
                <button className={classes.btn} type="button" onClick={onSubmitHandler}>Add Category</button>
                <div className={classes.images}>
                    <img src={photoone} alt="" className={classes.img} />
                    <button type='reset' className={classes.hover} onClick={deleteImages} >
                        <i className="fa-solid fa-trash-can deleteIcon"></i>
                    </button>
                </div>
            </form>
        </>
    )
}



export default CategoryAdd