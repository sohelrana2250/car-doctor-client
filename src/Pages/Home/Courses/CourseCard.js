import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const { _id, title, description, duration, price, image} = course;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img
                className="h-[300px]"
                    src={image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title">{title}</h2>
                    <div className="badge badge-outline font-semibold">{duration}</div>
                </div>
                <p>{description.length > 100 ? description.slice(0,100) : description+"..."}</p>
                <p><strong>Price : $</strong>{price}</p>
                <div className="card-actions justify-end">
                    <Link to={`/course-checkout/${_id}`} className="btn btn-sm btn-primary">Purchase</Link>
                    <Link to={`/course-info/${_id}`} className="btn btn-sm btn-primary">Info</Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;