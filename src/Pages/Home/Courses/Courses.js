import React from "react";
import CourseCard from "./CourseCard";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/Loading/LoadingSpinner";

const Courses = () => {
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
  return (
    <div className="max-w-[1440px] mx-auto p-10">
      <h1 className="text-center text-5xl font-bold mb-8">
        Our Most Popular Courses
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.slice(0, 5).map((course) => (
          <CourseCard key={course._id} course={course}></CourseCard>
        ))}
      </div>
    </div>
  );
};

export default Courses;
