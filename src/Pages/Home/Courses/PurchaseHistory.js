import { html2pdf } from "html2pdf.js";
import React from "react";
import LoadingSpinner from "../../Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const PurchaseHistory = () => {
  const {
    data: coursePurchaseHistory = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coursePurchaseHistory"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://car-doctor-server-pied-zeta.vercel.app/api/v1/courseHistory`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data?.data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
  });

  const handleDownload = (purchase) => {
    const element = document.getElementById(
      `payment-card-${purchase.transactionId}`
    );
    html2pdf().from(element).save();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }
  console.log(coursePurchaseHistory);
  return (
    <div className=" px-10 py-10">
      <h1 className="text-center font-bold text-3xl">Purchase History</h1>
      <div className="flex justify-center">
        {coursePurchaseHistory?.length === 0 ? (
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Course Purchase does not exist
            </h2>
            <p className="text-gray-600">
              There are currently no course purchase available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {!isLoading &&
              coursePurchaseHistory?.map((purchase, index) => (
                <div
                  key={index}
                  id={`payment-card-${purchase.transactionId}`}
                  className="max-w-md w-full p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-6"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {purchase.customer}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    Address: {purchase.address}
                  </p>
                  <p className="text-gray-700 mb-2">
                    District: {purchase.district}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Course Name: {purchase.courseName}
                  </p>
                  <p className="text-gray-700 mb-2">Email: {purchase.email}</p>
                  <p className="text-gray-700 mb-2">Phone: {purchase.phone}</p>
                  <p className="text-gray-700 mb-2">
                    Payable Amount: $ {purchase.price}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Transaction ID: {purchase.transactionId}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Payment Status:
                    <span
                      className={`${
                        purchase.paymentStatus
                          ? "text-green-500"
                          : "text-red-500"
                      } font-bold`}
                    >
                      {purchase.paymentStatus ? " Paid" : " Unpaid"}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    Purchase Date:{" "}
                    {new Date(purchase.purchaseDate).toLocaleString()}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Course Start From:{" "}
                    {new Date(purchase.courseStartDate).toLocaleString()}
                  </p>
                  {/* Add Download Button */}
                  <button
                    onClick={() => handleDownload(purchase)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Download Purchase History
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
