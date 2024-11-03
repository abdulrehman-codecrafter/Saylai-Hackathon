// import { collection, getDocs } from 'firebase/firestore';
// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { firestore } from '../config/firebase';
// import { useAuthContext } from './AuthContext';

// export const ItemsContext=createContext()

// export default function ItemsContextProvider(props) {

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const q = collection(firestore, "restaurantItems");
//         const querySnapshot = await getDocs(q);

//         let tempProducts = [];
//         querySnapshot.forEach((doc) => {
//           tempProducts.push(doc.data());
//         });
//         setRestaurantItems(tempProducts);
//         setIsAppLoading(false)
//       } catch (error) {
//         console.error("Error fetching products: ", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const [restaurantItems,setRestaurantItems]=useState([])
//   const {isAppLoading,setIsAppLoading}=useAuthContext()
//   return (

//     <ItemsContext.Provider value={{restaurantItems,setRestaurantItems}}>
//       {props.children}
//     </ItemsContext.Provider>
//   )
// }
import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { firestore } from '../config/firebase';
import { useAuthContext } from './AuthContext';

export const ItemsContext = createContext()

export default function ItemsContextProvider(props) {
  const [restaurantItems, setRestaurantItems] = useState([]);
  const { isAppLoading, setIsAppLoading } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = collection(firestore, "restaurantItems");
        const querySnapshot = await getDocs(q);

        let tempProducts = [];
        querySnapshot.forEach((doc) => {
          tempProducts.push({ id: doc.id, ...doc.data() }); // include the doc.id
        });
        setRestaurantItems(tempProducts);
        setIsAppLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to update the items state
  const updateItems = (updatedItems) => {
    setRestaurantItems(updatedItems);
  };

  return (
    <ItemsContext.Provider value={{ restaurantItems, setRestaurantItems, updateItems }}>
      {props.children}
    </ItemsContext.Provider>
  )
}
