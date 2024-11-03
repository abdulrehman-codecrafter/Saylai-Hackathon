import React, { useEffect, useContext } from "react";
import Header from "../../../components/Header/Header";
import heroImg from "../../../assets/header.png";
import ItemCard from "../../../components/Item Card";
import Footer from "../../../components/Footer";
import { Toaster, toast } from "sonner";
import Aos from "aos";
import "aos/dist/aos.css";
import  { ItemsContext } from "../../../Contexts/ItemContext";
import { Link } from "react-router-dom";

export default function Home() {
  const {restaurantItems}=useContext(ItemsContext)
  
  const featuredItems = restaurantItems.filter((item) => {
    return item.featured === true;
  });
  useEffect(() => {
    Aos.init();
  }, []);






  return (
    <>
      

      <Header />
      <div className="container mt-5">
        <div className="hero-section justify-content-center">
          <div className="hero-content ">
            <h1 data-aos="fade-right" data-aos-duration="1000">
              Meet, Eat & Enjoy The <br /> <span>True Taste</span>
            </h1>
            <p data-aos="fade-right" data-aos-duration="1300">
              Discover the true essence of culinary delight as you meet, eat,{" "}
              <br />
              savor the authentic flavors that define our passion for food.
            </p>
            <div
              className="hero_btn"
              data-aos="fade-right"
              data-aos-duration="1600"
            >
              <Link to="/menu" className="btn btn-warning">Get Started</Link>
            </div>
          </div>
          <div className="hero_img" data-aos="zoom-in" data-aos-duration="1400">
            <img src={heroImg} alt="" />
          </div>
        </div>

        <div className="special-container">
          <h2
            className="text-center mt-5"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            Our Featured Dishes
          </h2>
          <p
            className="text-center mt-3 mb-4"
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            Each dish promises an unforgettable dining experience, blending
            innovation with tradition to delight your senses.
          </p>
          <div className="special-items-card d-flex gap-3 w-100 justify-content-center flex-wrap">
            {featuredItems.map((item, i) => {
              return <ItemCard key={i} item={item}/>;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
