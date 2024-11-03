import React, { useEffect } from 'react'

import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiProductHuntFill } from "react-icons/ri";
export default function Home() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <h1 className="text-center mt-4 mb-5">Dashboard</h1>
      <div className="container d-flex flex-wrap  gap-5">
        <div className=" banner-card dash-banner-card " data-aos="zoom-in" data-aos-duration="1000">
          <div className="banner-icon">
          <FaUserFriends />
          </div>
          <h4>Users</h4>
          <p className="text-secondary">  Discover user insights, manage profiles, and stay connected with your audience all in one place.</p>
          <Link to="/dashboard/users" className="text-decoration-none" style={{ color: "#fc7f09" }}>
            Explore More &nbsp; <FaArrowRight />
          </Link>
        </div>

        <div className=" banner-card dash-banner-card " data-aos="zoom-in" data-aos-duration="1000">
          <div className="banner-icon">
            <FaCartShopping />
          </div>
          <h4>Orders</h4>
          <p className="text-secondary">  Discover user insights, manage profiles, and stay connected with your audience all in one place.</p>
          <Link to="/dashboard/orders" className="text-decoration-none" style={{ color: "#fc7f09" }}>
            Explore More &nbsp; <FaArrowRight />
          </Link>
        </div>
        
        <div className=" banner-card dash-banner-card " data-aos="zoom-in" data-aos-duration="1000">
          <div className="banner-icon">
          <RiProductHuntFill /> 
          </div>
          <h4>Users</h4>
          <p className="text-secondary">  Discover user insights, manage profiles, and stay connected with your audience all in one place.</p>
          <Link to="/dashboard/all-products" className="text-decoration-none" style={{ color: "#fc7f09" }}>
            Explore More &nbsp; <FaArrowRight />
          </Link>

        </div>
        <div className=" banner-card dash-banner-card " data-aos="zoom-in" data-aos-duration="1000">
          <div className="banner-icon ">
          <FaUserFriends />

          </div>
          <h4 >Online Users</h4>
          <p className="text-secondary">  Discover user insights, manage profiles, and stay connected with your audience all in one place.</p>
          <Link className="text-decoration-none" style={{ color: "#fc7f09" }}>
            Explore More &nbsp; <FaArrowRight />
          </Link>
        </div>
      </div>
    </>
  )
}
