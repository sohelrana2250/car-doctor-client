import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../../Pages/Shared/ErrorPage/ErrorPage";
import PostAction from "../../../FetchAction/PostAction";
import OldProductCard from "../../../Reuseable/OldProductCard";

const AllOldProducts = () => {
  const {
    data: allOldProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allOldProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/all_old_products`,
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
        const data = await res?.json();
        return data;
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

  const handelAddToCard = async (product) => {
    if (product) {
      PostAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/add_to_card_old_product`,
        product
      );
    } else {
      toast.error("Add To Card Error");
    }
  };

  return (
    <>
      {!isLoading && (
        <OldProductCard allOldProducts={allOldProducts} isLoading={isLoading} />
      )}
    </>
  );
};

export default AllOldProducts;
