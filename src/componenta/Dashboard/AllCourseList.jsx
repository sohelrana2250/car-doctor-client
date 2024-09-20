import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import { Link } from "react-router-dom";
import DeleteAction from "../../FetchAction/DeleteAction";

const AllCourseList = () => {
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

  const handelDeleteCourse = (id) => {
    if (id) {
      DeleteAction(
        `https://car-doctor-server-pied-zeta.vercel.app/api/v1/courses/${id}`,
        refetch
      );
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-10">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                className="h-[200px] w-full object-fill"
                src={course.image}
                alt=""
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title">{course.title}</h2>
                <div className="badge badge-outline font-semibold">
                  {course.duration}
                </div>
              </div>
              <p>{course.description.slice(0, 100) + " ..."}</p>
              <p>
                <strong>Price : $</strong>
                {course.price}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/course-info/${course._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Info
                </Link>
                <button
                  onClick={() => handelDeleteCourse(course._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourseList;
