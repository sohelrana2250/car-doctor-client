import React from "react";
import { Link } from "react-router-dom";

const DrivingLicense = () => {
  return (
    <div className="max-w-[1440px] mx-auto p-10">
      <h1 className="text-center text-5xl font-bold mb-8">Driving License</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img
              className="h-[300px]"
              src="https://ntl.com.pk/wp-content/uploads/2023/01/Bangladesh-Driving-License-copy-100.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Professional driving license</h2>
            </div>
            <p>Professional</p>
            <p>
              <strong>Price : </strong>12000
            </p>
            {/* <div className="card-actions justify-end">
                            <Link className="btn btn-sm btn-primary">Purchase</Link>
                            <Link className="btn btn-sm btn-primary">Info</Link>
                        </div> */}
          </div>
        </div>

        <div className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img
              className="h-[300px]"
              src="https://www.carsome.my/news/wp-content/uploads/wp/shutterstock_1785688385.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Amateur driving license</h2>
            </div>
            <p>Amateur</p>
            <p>
              <strong>Price :</strong>13000 Tk
            </p>
            {/* <div className="card-actions justify-end">
                            <Link className="btn btn-sm btn-primary">Purchase</Link>
                            <Link className="btn btn-sm btn-primary">Info</Link>
                        </div> */}
          </div>
        </div>

        <div className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img
              className="h-[300px]"
              src="https://internationaldrivingpermit.org/wp-content/uploads/2024/05/idp-sample-jpg.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">International Driving License</h2>
            </div>
            <p>International</p>
            <p>
              <strong>Price : </strong>15000 Tk
            </p>
            {/* <div className="card-actions justify-end">
                            <Link className="btn btn-sm btn-primary">Purchase</Link>
                            <Link className="btn btn-sm btn-primary">Info</Link>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingLicense;
