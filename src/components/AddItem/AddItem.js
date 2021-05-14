import "./AddItem.css";
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

const AddItem = (props) => {
  const [item, setItem] = useState({
    name: "",
    price: "",
    category: props.categories[1],
    image: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  // fill the inputs when edit button is clicked
  useEffect(() => {
    if (props.isEdit === true) {
      setItem({
        id: props.itemToEdit.id,
        name: props.itemToEdit.name,
        price: props.itemToEdit.price,
        category: props.itemToEdit.category,
        image: props.itemToEdit.image,
      });
    }
  }, [props]);

  // onchange events of inputs
  const editName = (e) => {
    setItem({ ...item, name: e.target.value });
  };
  const editPrice = (e) => {
    setItem({ ...item, price: e.target.value });
  };
  const editCategory = (e) => {
    setItem({ ...item, category: e.target.value });
  };
  const editImage = (e) => {
    setItem({ ...item, image: e.target.value });
  };

  // when save button is clicked
  const onClickHandler = (e) => {
    e.preventDefault();
    // to make sure data sent to menu does not have whitespace
    setItem({
      ...item,
      name: item.name.trim(),
      image: item.image.trim(),
    });
    setErrorMessage("");
    // error messages
    if (
      props.menu.find(
        (i) => i.name.toLowerCase().trim() === item.name.toLowerCase().trim()
      ) !== undefined
    ) {
      setErrorMessage("This item already exists");
    } else if (item.name.trim() === "") {
      setErrorMessage("Name should not be empty");
    } else if (Number(item.price) === 0) {
      setErrorMessage("Price should not be zero");
    } else {
      // to make sure data sent to menu does not have whitespace
      setItem({
        ...item,
        name: item.name.trim(),
        image: item.image.trim(),
      });
      // add item to menu array
      props.addItem(item);
      // clear the inputs
      setItem({
        name: "",
        price: 0,
        category: props.categories[1],
        image: "",
      });
    }
  };

  return (
    <div className="AddItem">
      {errorMessage !== "" && (
        <small className="error-message">{errorMessage}</small>
      )}
      <form>
        <div className="name">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={item.name}
            onChange={(e) => editName(e)}
          />
        </div>
        <div className="price">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={item.price}
            onChange={(e) => editPrice(e)}
          />
        </div>
        <div className="category">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={item.category}
            onChange={(e) => editCategory(e)}
          >
            {props.categories.slice(1).map((category) => (
              <option key={`additem-${category}`} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="image">
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={item.image}
            onChange={(e) => editImage(e)}
          />
        </div>
        {props.isEdit === false ? (
          <button onClick={onClickHandler}>Add Item</button>
        ) : (
          <button onClick={onClickHandler}>Edit Item</button>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    categories: state.categories,
    isEdit: state.isEdit,
    itemToEdit: state.itemToEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
