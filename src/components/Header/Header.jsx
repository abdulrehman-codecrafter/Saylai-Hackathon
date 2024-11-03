// import React, { useContext, useState } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { Dropdown, Space, Menu, Badge, Avatar } from "antd";
// import { useAuthContext } from "../../Contexts/AuthContext";
// import { CgProfile } from "react-icons/cg";
// import { FiShoppingBag } from "react-icons/fi";
// import { signOut } from "firebase/auth";
// import { useCartContext } from "../../Contexts/CartContext";

// export default function Header() {
//   const { user, isAuthenticated, dispatch } = useAuthContext();
//   const {cartItems}=useCartContext()

//   const items = isAuthenticated
//     ? [
//         {
//           key: "1",
//           label: <span>{user?.email}</span>,
//         },
//         {
//           key: "2",
//           label: (
//             <div 
//               onClick={async () => {
//                 dispatch({ type: "SET_LOGGED_OUT" });
//                 await signOut(auth);
//               }}
//             >
//               Logout
//             </div>
//           ),
//         },
//       ]
//     : [
//         {
//           key: "1",
//           label: (
//             <Link to="/auth/login" style={{ textDecoration: "none" }}>
//               Login
//             </Link>
//           ),
//         },
//       ];

//   return (
//     <nav className="navbar navbar-expand-lg bg-white">
//       <div className="container-fluid">
//         <Link to="/" className="navbar-brand" href="#">
//           <span className="navbar-brand-food">Food</span>
//           <span className="navbar-brand-man">man</span>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav  m-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link
//                 to="/"
//                 className="nav-link active"
//                 aria-current="page"
//                 href="#"
//               >
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/about" className="nav-link" href="#">
//                 About
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/menu" className="nav-link" href="#">
//                 Menu
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/orders" className="nav-link" href="#">
//                 Orders
//               </Link>
//             </li>
            
//             <li className="nav-item">
//               <Link to="/dashboard" className="nav-link" href="#">
//                 Dashboard
//               </Link>
//             </li>
            
//           </ul>
//           <div className="me-4">
//             <Dropdown
//               menu={{
//                 items,
//               }}
//             >
//               <a onClick={(e) => e.preventDefault()}>
//                 <Space>
//                   <CgProfile size={24} color="black" />
//                 </Space>
//               </a>
//             </Dropdown>
//             <Link to="/cart" className="text-black">
//               <Badge
//                 count={cartItems.length}
//                 style={{
//                   backgroundColor: "#088178",
//                 }}
//               >
//                 <FiShoppingBag size="24px" className="ms-3" />
                
//               </Badge>
//             </Link>
//           </div>
          
//         </div>
//       </div>
//     </nav>
//   );
// }
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dropdown, Space, Badge } from "antd";
import { useAuthContext } from "../../Contexts/AuthContext";
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useCartContext } from "../../Contexts/CartContext";
import { auth } from "../../config/firebase";

export default function Header() {
  const { user, isAuthenticated, dispatch } = useAuthContext();
  const { cartItems } = useCartContext();

  // Check if user has an admin role
  const isAdmin = user?.roles?.includes("admin");

  const items = isAuthenticated
    ? [
        {
          key: "1",
          label: <span>{user?.email}</span>,
        },
        {
          key: "2",
          label: (
            <div 
              onClick={async () => {
                dispatch({ type: "SET_LOGGED_OUT" });
                await signOut(auth);
              }}
            >
              Logout
            </div>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          ),
        },
      ];

  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
          <span className="navbar-brand-food">Food</span>
          <span className="navbar-brand-man">man</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </li>
            
            {/* Show Dashboard link only if user is an admin */}
            {isAdmin && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className="me-4">
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <CgProfile size={24} color="black" />
                </Space>
              </a>
            </Dropdown>
            <Link to="/cart" className="text-black">
              <Badge
                count={cartItems.length}
                style={{
                  backgroundColor: "#088178",
                }}
              >
                <FiShoppingBag size="24px" className="ms-3" />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
