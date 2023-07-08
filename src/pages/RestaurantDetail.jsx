/* eslint-disable no-unsafe-optional-chaining */
import { useContext, useEffect, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantsProvider";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import RatingCard from "../components/RatingCard";
import RestaurantsActions from "../context/ALL_ACTIONS";

const RestaurantDetail = () => {
  const {
    dispatchRestaurants,
    restaurantsState: { selectedRestaurant, restaurants },
  } = useContext(RestaurantsContext);

  const [restaurant, setRestaurant] = useState({});
  useEffect(() => {
    const foundRestaurant = restaurants.find(
      (ele) => ele.id === selectedRestaurant.id
    );
    setRestaurant({
      ...foundRestaurant,
      averageRating: getAvgRating(foundRestaurant.ratings),
    });
  }, [restaurants, selectedRestaurant]);

  const getAvgRating = (ratingvalue) =>
    ratingvalue.reduce((acc, ele) => Number(ele.rating) + acc, 0) /
    ratingvalue.length.toFixed(2);
  return (
    <section className="my-4 px-16">
      <span>
        <Link className=" w-min" to="/">
          <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
        </Link>
      </span>
      {restaurant && (
        <div className="ml-48 flex flex-col">
          <div className="flex flex-row justify-between border-b-2 pb-4 border-gray-400">
            <div className="flex text-left flex-col">
              <h1 className="text-7xl text-gray-900 font-bold mb-4">
                {restaurant.name}
              </h1>
              <p className="text-gray-500 text-lg">
                {restaurant?.menu?.map(({ name }) => name).join(", ")}
              </p>
              <p className="text-gray-500 text-lg">{restaurant.address}</p>
              {
                <p className="text-gray-500 text-lg">
                  Average Rating: {restaurant.averageRating}
                </p>
              }
            </div>
            <button
              onClick={() =>
                dispatchRestaurants({
                  type: RestaurantsActions.TOGGLE_MODAL,
                  payload: true,
                })
              }
              className="focus:outline-none  h-min text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            >
              Add Review
            </button>
          </div>
          <h3 className="font-bold text-gray-900 text-left mt-12 mb-8 text-4xl">
            Reviews{" "}
          </h3>
          {restaurant.ratings &&
            restaurant.ratings.length > 0 &&
            restaurant.ratings.map((rating, index) => (
              <RatingCard key={index} ratingDetails={rating} />
            ))}
        </div>
      )}
    </section>
  );
};

export default RestaurantDetail;
