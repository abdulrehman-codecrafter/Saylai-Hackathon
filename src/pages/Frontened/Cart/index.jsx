
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useCartContext } from "../../../Contexts/CartContext";
import { firestore } from '../../../config/firebase'; // Ensure you import Firestore configuration
import { doc, setDoc } from 'firebase/firestore'; // Import setDoc from Firestore
import { Button, message } from "antd"; // Import message for user feedback
import { useAuthContext } from "../../../Contexts/AuthContext";

export default function Cart() {
  const { cartItems, totalAmount, dispatch } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const {user}=useAuthContext()
  const handleQuantityChange = (item, change) => {
    if (change > 0) {
      dispatch({ type: "INCREASE_QUANTITY", payload: item });
    } else {
      dispatch({ type: "DECREASE_QUANTITY", payload: item });
    }
  };


  const handleDeleteItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      message.warning("Your cart is empty!");
      return;
    }

    const orderData = {
      userId:user.user_uid,
      items: cartItems,
      totalAmount,
      orderId: `ORDER_${Date.now()}`, // Generate a unique order ID
      status: 'Pending', // Initial status can be 'Pending', 'Confirmed', etc.
    };

    try {
      setIsLoading(true)
      
      const orderRef = doc(firestore, 'orders', orderData.orderId);
      await setDoc(orderRef, orderData); 

      message.success("Order confirmed successfully!");
      dispatch({ type: "CLEAR_CART" }); 
    } catch (error) {
      console.error("Error confirming order: ", error);
      message.error("Failed to confirm order: " + error.message);
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" }); 
  }, [cartItems, dispatch]);

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center fw-semibold my-5">Order Summary</h2>
        <div className="all-order-items-container">
          {cartItems.length === 0 ? (
            <h5 className="text-center">Your cart is empty!</h5>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id} // Use item.id as key for better performance
                className="order-item-container mb-3 d-flex align-items-center flex-column gap-4 flex-md-row"
              >
                <img src={item.imgUrl} alt={item.name} />
                <h5 style={{ textTransform: "capitalize" }}>{item.name}</h5>
                <h6>${item.price}</h6>
                <div className="quantity-counter">
                  <button
                    className="btn btn-dark counter-btn rounded-0 px-3 py-2 text-white"
                    onClick={() => handleQuantityChange(item, -1)}
                  >
                    -
                  </button>
                  <div className="border px-3 py-2 counter">{item.quantity}</div>
                  <button
                    className="btn btn-dark counter-btn rounded-0 px-3 py-2 text-white"
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger px-3"
                  onClick={() => handleDeleteItem(item)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="summary-container d-flex justify-content-end">
          <div className="bill-summary border border-black p-4 mt-4">
            <h5>Bill Summary</h5>
            <div className="d-flex">
              <div className="bill-summary-headings">Total :</div>
              <div>${totalAmount.toFixed(2)}</div> {/* Display total with two decimal places */}
            </div>
            <div className="order-confirm mt-3">
            <Button
              loading={isLoading}
              onClick={handleConfirmOrder}
              
            >
              Confirm Order
            </Button>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
