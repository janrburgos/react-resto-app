import "./App.css";
import React from "react";

import RestaurantApp from "./components/RestaurantApp/RestaurantApp";
import AddItem from "./components/AddItem/AddItem";
import CartContainer from "./components/CartContainer/CartContainer";

const App = () => {
  return (
    <div className="App">
      <RestaurantApp />
      <AddItem />
      <CartContainer />
    </div>
  );
};

export default App;
