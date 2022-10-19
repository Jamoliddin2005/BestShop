import React, { useEffect, useState } from "react";
import classes from "./NewProducts.module.css";
import ProductsAdd from "./ProductsAdd/ProductsAdd";
import Products from "./Products/Products";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";

const NewProducts = ({
  loading,
  setLoading,
  contacts,
  setContacts,
  ProductMore,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoone, setPhotoOne] = useState("https://bref.sh/img/logo-null.png");

  const [products, setProducts] = useState([
    {
      name: "",
      price: "",
      photo: "",
      desc: "",
      categoryId: "",
      gender: ""
    },
  ]);

  const ProductForm = new FormData();
  ProductForm.append("name", name);
  ProductForm.append("price", price.replace("e"));
  ProductForm.append("desc", desc);
  ProductForm.append("gender", gender);
  ProductForm.append("categoryId", categoryId);
  if (photo) {
    for (let i = 0; i < photo.length; i++) {
      ProductForm.append("photo", photo[i]);
    }
  }

  const CreateProductHandler = async (e) => {
    e.preventDefault();
    const ProductPhoto = document.getElementById("ProductPhoto");
    ProductPhoto.value = "";
    try {
      e.preventDefault();
      if (name && price && desc && photo && categoryId) {
        e.preventDefault();

        setPhoto("");
        setName("");
        setPrice("");
        setDesc("");
        setLoading("");
        setProducts("");
        setGender("")
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/add/addProduct`,
          ProductForm
        );
        setProducts(data.data);
        toast.success("Product qo'shildi");
        setPhotoOne("https://bref.sh/img/logo-null.png");
      } else {
        toast.error("Productni to'liq kiriting");
      }
    } catch (error) {
      return toast.error("ERROR!!!")
    }
  };

  useEffect(() => {
    const productBase = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/add/showProducts`);
      setProducts(await response.json());
      setLoading(false);
    };
    productBase();
  }, []);

  const ProductDelete = async (id) => {
    const res = window.confirm("Mahsulot o'chirilsinmi?");
    if (res) {
      toast.success("Mahsulot o'chirildi!");
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/delete/products/delete/` + id
      );
      setProducts(data.data);
    }
  };

  return (
    <div className={classes.NewProducts}>
      <ProductsAdd
        setName={setName}
        setPrice={setPrice}
        setDesc={setDesc}
        setCategoryId={setCategoryId}
        setPhoto={setPhoto}
        CreateProductHandler={CreateProductHandler}
        name={name}
        price={price}
        desc={desc}
        categoryId={categoryId}
        photo={photo}
        photoone={photoone}
        setPhotoOne={setPhotoOne}
        loading={loading}
        setLoading={setLoading}
        contacts={contacts}
        setContacts={setContacts}
        gender={gender}
        setGender={setGender}
      />

      <div className={classes.ProductsDiv}>
        {products.length ? (
          loading ? (
            <Loading />
          ) : (
            products.map((item, index) => (
              <Products
                gender={gender}
                setGender={setGender}
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                photo={item.photo}
                desc={item.desc}
                categoryId={item.categoryId}
                ProductDelete={ProductDelete}
                ProductMore={ProductMore}
              />
            ))
          )
        ) : (
          <h2 className={classes.productNull}>Mahsulotlar yo'q</h2>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
