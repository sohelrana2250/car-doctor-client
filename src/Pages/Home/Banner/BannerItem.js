import React from "react";
import "./BannerItem.css";
import { Link } from "react-router-dom";

const BannerItem = ({ slide }) => {
  const { image, id, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-img w-full h-[650px]">
        <img
          src={image}
          alt=""
          className="w-full h-full object-fill rounded-sm"
        />
      </div>
      <div className="absolute flex flex-col justify-center transform -translate-y-1/2 left-5 md:left-10 lg:left-24 top-1/3">
        <h1 className="text-lg md:text-4xl lg:text-3xl font-serif text-white mb-5">
        Affordable Prices for Course Purchases and Products
        </h1>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 w-4/5 md:w-3/5 lg:w-2/5 left-5 md:left-10 lg:left-24 top-1/2">
        <p className="text-sm md:text-lg lg:text-xl text-white">
        We offer a variety of courses and products at competitive prices. While there are many options available, we ensure that each offering maintains high quality, regardless of the cost. Whether you’re looking to invest in a new course, or explore our latest or previous product offerings, you’ll find that we prioritize value without compromising on quality.
        </p>
      </div>
      <div className="absolute flex flex-col sm:flex-row justify-start transform -translate-y-1/2 w-4/5 md:w-3/5 lg:w-2/5 left-5 md:left-10 lg:left-24 top-3/4 space-y-2 sm:space-y-0 sm:space-x-5">
        <Link to="/more-courses" className="btn btn-primary">
          Courses
        </Link>
        <Link to="/old_products" className="btn  btn-primary">
          Old Product
        </Link>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerItem;
