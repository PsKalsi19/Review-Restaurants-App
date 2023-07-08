/* eslint-disable react/prop-types */

import DishesCard from "./DishesCard";

const RestaurantsOverview = ({ restaurantsDetails }) => {
  const { name, menu } = restaurantsDetails;

  return (
    <div className="flex my-4 flex-col">
      <h4 className="text-xl my-4 text-left font-extrabold text-gray-900">
        Dishes by {name}
      </h4>
      <div className="flex flex-row space-x-8">
        {menu &&
          menu.length > 0 &&
          menu.map((menuItem, index) => (
            <DishesCard
              menuDetails={menuItem}
              restaurantsDetails={restaurantsDetails}
              key={index + menuItem.name}
            />
          ))}
      </div>
    </div>
  );
};

export default RestaurantsOverview;
