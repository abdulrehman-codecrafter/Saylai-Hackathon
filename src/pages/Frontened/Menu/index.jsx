import React, { useContext, useEffect, useState } from "react";

import ItemCard from "../../../components/Item Card";
import Header from "../../../components/Header/Header";
import { Toaster, toast } from "sonner";
import { ItemsContext } from "../../../Contexts/ItemContext";


export default function Shop() {
  const {restaurantItems}=useContext(ItemsContext)
  
  const [filterBtns, setFilterBtns] = useState([]);
  const [foodItems,setFoodItems]=useState(restaurantItems)
  
  useEffect(() => {
    let filterBtnsTypes = restaurantItems.map((item) => {
      return item.category.toLowerCase();
    });
    
    setFilterBtns([...new Set(filterBtnsTypes)]);
  }, []);


  const setAllItems = () => {
    setFoodItems(restaurantItems);
  };

  const handleFilterItems = (category) => {
    const filteredItems = restaurantItems.filter((fItem) => {
      return fItem.category === category;
    });
    setFoodItems(filteredItems);
  };

  

  return (
    <>
      

      <Header />

      <div className="filter-btns gap-2 gap-md-4 mt-5 mb-4">
        <button
          className="btn"
          style={{ textTransform: "capitalize" }}
          onClick={setAllItems}
        >
          All
        </button>
        {filterBtns.map((type, i) => {
          return (
            <button
              className="btn"
              style={{ textTransform: "capitalize" }}
              key={i}
              onClick={() => handleFilterItems(type)}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div className="container">
        <div className="special-items-card d-flex gap-3 w-100 justify-content-center flex-wrap">
          {foodItems.map((item, i) => {
            return <ItemCard key={i} item={item}  />;
          })}
        </div>
      </div>
    </>
  );
}
