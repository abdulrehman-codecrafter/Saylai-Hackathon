import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Toaster, toast } from "sonner";
import { useCartContext } from "../../Contexts/CartContext";


export default function ItemCard({ item }) {
  const {dispatch}=useCartContext()
  useEffect(() => {
    Aos.init(); 
  }, []);
  return (
    <>
      <div
        className="item-card  px-4 py-4"
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        <img src={item.imgUrl} alt="" className="mb-3" />
        <h4 className="text-center" style={{ textTransform: "capitalize" }}>
          {item.name}
        </h4>
        <p className="">{item.description}</p>

        <div className="item-footer">
          <p className="price text-success">$ {item.price}</p>
          <button className="btn text-white" onClick={()=>{dispatch({type:"ADD_ITEM",payload:item})}}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
