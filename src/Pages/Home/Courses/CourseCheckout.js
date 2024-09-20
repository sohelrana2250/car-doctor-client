import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/Loading/LoadingSpinner";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import AllDistrict from "../../../utils/AllDistrict";
import GenerateImage from "../../../FetchAction/GenerateImage";

const CourseCheckout = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const {
    data: course = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["course-checkout"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://car-doctor-server-pied-zeta.vercel.app/api/v1/courses/${id}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res?.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const { _id, price, title, start_date } = course.data;

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const bloodGroup = form.bloodGroup.value;
    const nid = form.nid.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const district = form.district.value;

    const imageFile = form.image.files[0];
    const photo = await GenerateImage(imageFile);

    const coursePurchase = {
      courseId: _id,
      courseName: title,
      price: Number(price),
      customer: name,
      email,
      bloodGroup,
      nid,
      district,
      phone,
      courseStartDate: start_date,
      address,
      photo,
      purchaseDate: new Date(),
    };

    fetch(
      "https://car-doctor-server-pied-zeta.vercel.app/api/v1/courseHistory",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(coursePurchase),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.error("Course Already Purchase!");
        }
        if (result.url) {
          window.location.replace(result.url);
        }
        console.log(result);
      });
  };
  return (
    <>
      <div className="bg-white border  rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">{title} Course</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="product-modal"
          ></button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="product-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="category"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  id="brand"
                  defaultValue={user?.email}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="bloodGroup"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  className="select select-info w-full max-w-full"
                >
                  <option disabled selected>
                    Select Blood Group
                  </option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (bloodGroup, index) => (
                      <option key={index} value={bloodGroup}>
                        {bloodGroup}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="nid"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  NID / Birth Certificate
                </label>
                <input
                  type="text"
                  maxLength={15}
                  name="nid"
                  id="nid"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="NID / Birth Certificate"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="district"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Districts
                </label>
                <select
                  name="district"
                  className="select select-info w-full max-w-full"
                >
                  <option disabled selected>
                    Select District
                  </option>
                  {AllDistrict?.map((district, index) => (
                    <option
                      key={index}
                      value={`${
                        district.upazila_name + " " + district.district_name
                      }`}
                    >
                      {district.upazila_name + " " + district.district_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  minLength={11}
                  maxLength={11}
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Price
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={"$ " + price}
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Price"
                  required
                />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Address
                </label>
                <textarea
                  name="address"
                  maxLength={150}
                  id="product-details"
                  rows="3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 w-full p-4"
                  placeholder="Address"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Insert Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="file-input file-input-bordered"
                  accept=".png, .jpg, .jpeg"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button className="btn btn-info" type="submit">
                Purchase
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseCheckout;
