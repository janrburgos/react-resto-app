import "./MenuItem.css";
import { connect } from "react-redux";

const MenuItem = (props) => {
  return (
    <div className="MenuItem">
      <img src={props.item.image} alt={props.item.name} />
      <div className="item-right">
        <strong>{props.item.name}</strong>
        <p>
          <small>Php {props.item.price}</small>
        </p>
        <button
          onClick={() => {
            props.orderItem(props.item);
          }}
        >
          Order
        </button>
        <button
          onClick={() => {
            props.editItem(props.item);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this item?")) {
              props.deleteItem(props.item.id);
              alert(`Item ${props.item.name.toUpperCase()} deleted`);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderItem: (item) => dispatch({ type: "ADD_TO_CART", payload: item }),
    editItem: (item) => dispatch({ type: "EDIT_ITEM", payload: item }),
    deleteItem: (id) => dispatch({ type: "DELETE_ITEM", payload: id }),
  };
};

export default connect(null, mapDispatchToProps)(MenuItem);
