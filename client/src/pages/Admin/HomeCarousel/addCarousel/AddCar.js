import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const AddCar = ({
  title,
  photo,
  setTitle,
  desc,
  setDesc,
  setSelect,
  setPhoto,
  handleSubmit,
  setCategoryId
}) => {
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([
    {
      name: "",
      photo: "",
    },
  ]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/add/showCategory");
      setContacts(await response.json());
      setLoading(false);
    };
    getCategories();
  }, []);

  const selects = [
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelect(selectedOption.value);
  };

  const AnimatedSelect = makeAnimated();
  return (
    <form encType="multipart/form-data">
      <label htmlFor="Title">Carousel Title</label>
      <input
        type="text"
        name="title"
        id="Title"
        required
        value={title}
        placeholder="Carousel Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="desc">Carousel Description</label>
      <input
        type="text"
        name="desc"
        id="desc"
        required
        value={desc}
        placeholder="Carousel Description"
        onChange={(e) => setDesc(e.target.value)}
      />
      <label htmlFor="desc">Seasons</label>
      <Select
        className="selectReact"
        components={AnimatedSelect}
        isSearchable={true}
        options={selects}
        hideSelectedOptions={true}
        placeholder="Seasons..."
        onChange={handleChange}
        value={selectedOption}
      />
      <label htmlFor="categoryId">Category</label>
      {loading ?
        <h3 className={"textLoading"}>Loading...</h3> :
        <select name="categoryId" id="categoryId" onChange={(e) => setCategoryId(e.target.value)} required  >
          <option hidden>Category</option>
          {contacts.map((item, index) => (
            <option key={index} value={item._id} id={item._id}>{item.name}</option>
          ))}
        </select>
      }
      <label htmlFor="photo">Carousel Image</label>
      <input
        className="photoinp"
        type="file"
        accept="image/*"
        name="photo"
        id="photo"
        required
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="button" onClick={handleSubmit}>
        Add Carousel
      </button>
    </form>
  );
};

export default AddCar;
