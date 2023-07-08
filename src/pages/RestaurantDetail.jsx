/* eslint-disable no-unsafe-optional-chaining */
import { useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsProvider";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import RatingCard from "../components/RatingCard";

const RestaurantDetail = () => {
  const location = useLocation();
  const { name, address, phone, ratings, averageRating, description, menu } =
    location?.state;
  const menuItemsName = menu.map(({ name }) => name).join(", ");
  // const {
  //     restaurantsState: {
  //       cuisines,
  //       selectedCuisine,
  //       restaurantsDataOnCuisineBasis,
  //     },
  //     handleCuisineSelect,
  //   } = useContext(RestaurantsContext);

  return (
    <section className="my-4 px-16">
      <span>
        <Link className=" w-min" to="/">
          <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
        </Link>
      </span>
      <div className="ml-48 flex flex-col">
        <div className="flex flex-row justify-between border-b-2 pb-4 border-gray-400">
          <div className="flex text-left flex-col">
            <h1 className="text-7xl text-gray-900 font-bold mb-4">{name}</h1>
            <p className="text-gray-500 text-lg">{menuItemsName}</p>
            <p className="text-gray-500 text-lg">{address}</p>
            <p className="text-gray-500 text-lg">
              Average Rating: {averageRating}
            </p>
          </div>
          <button className="focus:outline-none  h-min text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">
            Add Review
          </button>
        </div>
        <h3 className="font-bold text-gray-900 text-left mt-12 mb-8 text-4xl">Reviews </h3>
        {
            ratings && ratings.length>0 && ratings.map((rating,index)=><RatingCard key={index} ratingDetails={rating}/>)
        }
      </div>
    </section>
  );
};

export default RestaurantDetail;
