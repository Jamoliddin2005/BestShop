import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../../../components/Loading/Loading'
import classes from "./Categories.module.css"
import Category from './Category/Category'
import CategoryAdd from './CategoryAdd/CategoryAdd'
const Categories = ({ getCategory,
    loading,
    setLoading,
    contacts,
    setContacts }) => {

    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('https://bref.sh/img/logo-null.png')
    const [photoone, setPhotoOne] = useState('https://bref.sh/img/logo-null.png')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (name && photo && contacts) {
            e.preventDefault()
            try {
                e.preventDefault()
                toast.success("Categoriya qo'shildi");
                const dataCategory = new FormData()
                dataCategory.append('name', name)
                dataCategory.append('photo', photo)
                const fileInput = document.querySelector("#photoInputAdd");
                fileInput.value = "";
                setName("")
                const { data } = await axios.post(
                    "http://localhost:5000/add/addCategory",
                    dataCategory
                );
                setContacts(data.data)
                setPhotoOne('https://bref.sh/img/logo-null.png')
            } catch (error) {
                return toast.error("ERROR!!!")
            }
        } else {
            e.preventDefault()
            toast.error("Mahsulotlarni to'liq kiriting!!!");
        }
    }

    const deleteCategory = async (id) => {
        const res = window.confirm("Bu Categoriya o'chirib tashlansinmi?")
        if (res) {
            toast.success("Categoriya o'chirib tashlandi")
            const { data } = await axios.delete('http://localhost:5000/delete/Categories/delete/' + id)
            setContacts(data.data);
        }
    }

    return (
        <div className={classes.Categories}>
            <h1 className={classes.title}>Categories</h1>
            <div className={classes.row}>
                <div className={classes.addCategory}>
                    <CategoryAdd photoone={photoone}
                        setPhotoOne={setPhotoOne} name={name} photo={photo} setName={setName} setPhoto={setPhoto} onSubmitHandler={onSubmitHandler} />
                </div>
                <div className={classes.categories}>
                    {contacts.length
                        ? loading ? <Loading />
                            : contacts.map((item, index) => (
                                <Category getCategory={getCategory} deleteCategory={deleteCategory} id={item._id} key={index} name={item.name} photo={item.photo} />
                            ))
                        : <h2>Categoriyalar yo'q</h2>}

                </div>
            </div>
        </div>
    )
}

export default Categories