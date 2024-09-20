import React from "react";
import { useForm } from "react-hook-form";
import GenerateImage from "../../FetchAction/GenerateImage";
import PostAction from "../../FetchAction/PostAction";

const CreateCourse = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const photo = await GenerateImage(imageFile);
    data.image = photo;
    data.duration = data.duration + " weeks";
    console.log(photo);
    PostAction(
      "https://car-doctor-server-pied-zeta.vercel.app/api/v1/courses",
      { data }
    );
    reset(); // Reset form after submission
  };
  return (
    <div className="p-10 mb-5">
      <form
        className="card-body border rounded-lg p-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Create a new Course</h1>

        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Course Title"
            className="input input-bordered"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Course Description"
            className="textarea textarea-bordered textarea-lg"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Duration */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Duration</span>
          </label>
          <input
            type="number"
            placeholder="e.g., 4 weeks"
            className="input input-bordered"
            {...register("duration", {
              required: "Duration is required",
              valueAsNumber: true,
              min: { value: 1, message: "Duration must be greater than zero" },
            })}
          />
          {errors.duration && (
            <p className="text-red-500">{errors.duration.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 1, message: "Duration must be greater than zero" },
            })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered"
            {...register("image", { required: "Image is required" })}
            accept=".jpg, .jpeg, .png, .gif"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            {...register("start_date", { required: "Start Date is required" })}
          />
          {errors.start_date && (
            <p className="text-red-500">{errors.start_date.message}</p>
          )}
        </div>

        <div className="grid smd:grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Practical Class</span>
            </label>
            <input
              type="number"
              placeholder="Practical Class"
              className="input input-bordered"
              {...register("practical", {
                required: "Practical Class is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Duration must be greater than zero",
                },
              })}
            />
            {errors.practical && (
              <p className="text-red-500">{errors.practical.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Automobile Class</span>
            </label>
            <input
              type="number"
              placeholder="Automobile Class"
              className="input input-bordered"
              {...register("automobile", {
                required: "Automobile Class is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Duration must be greater than zero",
                },
              })}
            />
            {errors.automobile && (
              <p className="text-red-500">{errors.automobile.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Theory Class</span>
            </label>
            <input
              type="number"
              placeholder="Theory Class"
              className="input input-bordered"
              {...register("theory", {
                required: "Theory Class is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Duration must be greater than zero",
                },
              })}
            />
            {errors.theory && (
              <p className="text-red-500">{errors.theory.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
