import React from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const CourseInfo = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const {
    data: course = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["course-info"],
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
  const {
    _id,
    title,
    description,
    duration,
    price,
    image,
    start_date,
    practical,
    automobile,
    theory,
  } = course?.data;
  return (
    <div className="max-w-[1440px] mx-auto p-20">
      <div className="card lg:card-side bg-base-100 shadow-2xl relative">
        <figure>
          <img
            src={image}
            alt="Album"
            className="w-[450px] h-[450px] object-fill"
          />
        </figure>
        <div className="card-body ">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <span>{description}</span>
          <span>
            <strong>Price: $</strong>
            {price}
          </span>
          <span>
            <strong>Starting from: </strong>
            {start_date}
          </span>
          <span>
            <strong>Duration: </strong>
            {duration}
          </span>
          <div className="flex md:flex-row sm:flex-col gap-5">
            <span className="border p-2">
              <strong>Practical Class: </strong>
              {practical}
            </span>
            <span className="border p-2">
              <strong>Automobile Class: </strong>
              {automobile}
            </span>
            <span className="border p-2">
              <strong>Theory Class: </strong>
              {theory}
            </span>
          </div>
          <span className="border p-2 w-1/5">
            <strong>Total Classes: </strong>
            {practical + automobile + theory}
          </span>
          <div className="absolute bottom-4 right-4">
            <Link
              to={`/course-checkout/${_id}`}
              className="btn btn-sm btn-primary"
            >
              Purchase
            </Link>
          </div>
        </div>
      </div>

      <div className="card px-20 mt-20 text-justify">
        <h1 className="text-3xl mb-2">
          Basics of {title} Driving School in Dhaka
        </h1>
        <p>
          {title}s are the new age sensation in Bangladesh. Basically, the
          exclusive features are extremely suitable for busy city dwellers. With
          an {title}, there is no clutch pedal and the gear is automatic. As a
          result, a multi-tasking person can immensely be attracted to this
          piece. Moreover, for people who have to drive in busy traffics auto
          gear is the best option. That is why the number of {title}s on the
          roads of Dhaka city is ever on the rise. {title}s demand easier
          driving training than that of the manual ones. There are several{" "}
          {title} Driving School in Dhaka but you must find a suitable one.
        </p>
        <br />
        <h1 className="text-3xl mb-2">About {title} Driving School in Dhaka</h1>
        <p>
          Perhaps {title}s hit the first position in the preferred list of most
          of the city dwellers but {title} driving training is not that much
          available in the city. Yet you may find some of the training
          institutes but there are chances to face disappointments. {title}s are
          more demanding when you handle them than manual cars. Though the
          learning process is pretty easy the trainer must have proper knowledge
          about the beyond stereotype car.
        </p>
        <br />
        <h1 className="text-3xl mb-2">Explore Our {title} Driving Services</h1>
        <p>
          {" "}
          We have something different to offer your regarding {title} driving
          services. Check out the amazing deals below:
        </p>

        <ul className="list-disc">
          <div className="px-10 py-4">
            <li>
              Our instructors are well trained on {title}. Thus you will get the
              most authentic training facility.
            </li>
            <li>
              Our {title} driving training needs theoretical basic training thus
              we ensure facilitated large classrooms.
            </li>
            <li>
              We offer hostel and accommodations facilities.
              {title} driving needs prolonged training thus our trainers are
              extremely friendly.
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CourseInfo;
