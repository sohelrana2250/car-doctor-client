import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";

const AllPurchaseCourseList = () => {
  const {
    data: allPurchaseCourse = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allPurchaseCourse"],
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
        const data = await res.json();
        return data?.data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }
  console.log(allPurchaseCourse);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Price</th>
              <th>Purchase Date</th>
              <th>Course Date</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              allPurchaseCourse?.map((course) => (
                <tr key={course._id}>
                  <td>{course.courseName}</td>
                  <td>{course.customer}</td>
                  <td>
                    <img
                      src={course.photo}
                      alt={course.customer}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td>{course.email}</td>
                  <td>
                    <p className="bg-blue-900 rounded-sm text-white text-center">
                      {course.price}
                    </p>
                  </td>
                  <td>{course.purchaseDate}</td>
                  <td>{course.courseStartDate}</td>
                  <td>{course.address}</td>
                  <td>{course.paymentStatus ? "Paid" : "Unpaid"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllPurchaseCourseList;
