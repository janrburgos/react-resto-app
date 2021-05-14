import { v4 as uuidv4 } from "uuid";

const initState = {
  menu: [
    {
      id: uuidv4(),
      name: "Burger",
      price: 50,
      category: "Food",
      image: "https://image.flaticon.com/icons/svg/1046/1046784.svg",
    },
    {
      id: uuidv4(),
      name: "Pizza",
      price: 100,
      category: "Food",
      image: "https://image.flaticon.com/icons/svg/1046/1046771.svg",
    },
    {
      id: uuidv4(),
      name: "Fries",
      price: 25,
      category: "Food",
      image: "https://image.flaticon.com/icons/svg/1046/1046786.svg",
    },
    {
      id: uuidv4(),
      name: "Coffee",
      price: 35,
      category: "Drink",
      image: "https://image.flaticon.com/icons/svg/1046/1046785.svg",
    },
    {
      id: uuidv4(),
      name: "Iced Tea",
      price: 45,
      category: "Drink",
      image: "https://image.flaticon.com/icons/svg/1046/1046782.svg",
    },
    {
      id: uuidv4(),
      name: "Hot Tea",
      price: 45,
      category: "Drink",
      image: "https://image.flaticon.com/icons/svg/1046/1046792.svg",
    },
  ],

  itemToEdit: {
    id: "",
    name: "",
    price: 0,
    category: "Food",
    image: "",
  },

  categories: ["All", "Food", "Drink", "Dessert"],
  selectedCategory: "Select Category",

  isEdit: false,

  cart: [],
};

const reducer = (state = initState, action) => {
  let addedToCart;
  let removedToCart;
  let selectedItem;
  let newCartArray;
  let index;

  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        menu: [...state.menu, { ...action.payload, id: uuidv4() }],
        isEdit: false,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        menu: state.menu.filter((item) => item.id !== action.payload),
      };
    case "EDIT_ITEM":
      // to avoid the edit button functioning like a delete button
      if (state.isEdit === true) {
        alert("You still have another pending item to edit.");
        return { ...state };
      } else {
        return {
          ...state,
          // flag when edit button is clicked instead of add item buttton
          isEdit: true,
          // pass the properties of menu item to be edited to this state and then pass it to add item component
          itemToEdit: action.payload,
          // remove item to be edited from the menu
          menu: state.menu.filter((item) => item.id !== action.payload.id),
          // remove item to be edited from the cart
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      }
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case "ADD_TO_CART":
      if (
        // if menu item to be ordered is not yet in the cart
        state.cart.find((item) => item.id === action.payload.id) === undefined
      ) {
        addedToCart = [...state.cart, { ...action.payload, quantity: 1 }];
      } else {
        // if menu item is already in the cart
        selectedItem = state.cart.find((item) => item.id === action.payload.id);
        selectedItem = { ...selectedItem, quantity: selectedItem.quantity + 1 };
        newCartArray = [...state.cart];

        index = state.cart.findIndex((item) => item.id === action.payload.id);
        newCartArray[index] = selectedItem;

        addedToCart = [...newCartArray];
      }

      return {
        ...state,
        cart: addedToCart,
      };
    case "REMOVE_TO_CART":
      removedToCart = state.cart.filter((item) => item.id !== action.payload);

      return {
        ...state,
        cart: removedToCart,
      };
    case "INCREMENT":
      selectedItem = state.cart.find((item) => item.id === action.payload);
      selectedItem = { ...selectedItem, quantity: selectedItem.quantity + 1 };
      newCartArray = [...state.cart];

      index = state.cart.findIndex((item) => item.id === action.payload);
      newCartArray[index] = selectedItem;

      return {
        ...state,
        cart: newCartArray,
      };
    case "DECREMENT":
      selectedItem = state.cart.find((item) => item.id === action.payload);
      if (selectedItem.quantity > 1) {
        selectedItem = { ...selectedItem, quantity: selectedItem.quantity - 1 };
        newCartArray = [...state.cart];

        index = state.cart.findIndex((item) => item.id === action.payload);
        newCartArray[index] = selectedItem;

        return {
          ...state,
          cart: newCartArray,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
};

export default reducer;
