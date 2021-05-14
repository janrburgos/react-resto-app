import "./RestaurantApp.css";
import React, { useState } from "react";
import MenuItem from "../MenuItem/MenuItem";

import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

const RestaurantApp = (props) => {
  const [category, setCategory] = useState(false);
  const showCategories = () => {
    category === false ? setCategory(true) : setCategory(false);
  };

  return (
    <div className="RestaurantApp">
      <div className="restaurant-app-header">
        <p>Restaurant App</p>

        {/* button for food category filtering */}
        <button className="category-btn" onClick={showCategories}>
          <div className="category-name">{props.selectedCategory}</div>
          <span>&#129171;</span>
          {category && (
            <div className="category-box" onMouseLeave={showCategories}>
              {props.categories.map((category) => (
                <Link
                  to={category === "All" ? "/" : `/${category}`}
                  key={`link-select-${category}`}
                >
                  <div
                    key={`filter-category-${category}`}
                    onClick={() => {
                      props.selectCategory(category);
                    }}
                  >
                    {category}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </button>
      </div>

      {/* display for all or filtered food items */}
      <div className="restaurant-app-items">
        <Route exact path="/">
          {props.menu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Route>
        {props.categories.map((category) => {
          return (
            <Route exact path={`/${category}`} key={`route-select-${category}`}>
              {props.menu
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
            </Route>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    categories: state.categories,
    selectedCategory: state.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (category) =>
      dispatch({ type: "SELECT_CATEGORY", payload: category }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantApp);
