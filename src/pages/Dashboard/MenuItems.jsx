import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const items = [
  
  {
    key: 1,
    icon: <IoHomeOutline size={16}/>,
    label: (<Link to="/dashboard" className="text-decoration-none" > Home </Link>),
  },
  {
    key: 2,
    icon: <RiProductHuntLine  size={16}/>,
    label: (<Link  className="text-decoration-none" > Products  </Link>),
    children: [
      {
        key: "all-product",
        label: (<Link to="/dashboard/all-products" className="text-decoration-none" > All </Link>),
      },
      {
        key: "add-product",
        label: (<Link to="/dashboard/add-product" className="text-decoration-none" > Add </Link>),
      },
    ],
  },
  {
    key: 3,
    icon: <IoCartOutline size={16}/>,
    label: (<Link to="/dashboard/orders" className="text-decoration-none" > Orders </Link>),
  },
  {
    key: 4,
    icon: <FaRegCircleUser  size={16}/> ,
    label: (<Link to="/dashboard/users" className="text-decoration-none" > Users </Link>),
  },
];