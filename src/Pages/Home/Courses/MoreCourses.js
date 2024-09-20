import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Shared/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import DrivingLicense from "../DrivingLicense/DrivingLicense";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";

const MoreCourses = () => {
  const token = localStorage.getItem("token");
  const {
    data: courses = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://car-doctor-server-pied-zeta.vercel.app/api/v1/courses",
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
        return data?.data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="max-w-[1440px] mx-auto p-10">
      <h1 className="text-center text-5xl font-bold mb-8">Our Courses</h1>
      <div className="flex justify-end">
        <Link
          className="btn btn-outline border p-2 mb-3"
          to="/purchase-history"
        >
          Purchase History
        </Link>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course}></CourseCard>
        ))}
      </div>
      <br />
      <br />
      <br />
      <hr />
      <DrivingLicense></DrivingLicense>
    </div>
  );
};

export default MoreCourses;
