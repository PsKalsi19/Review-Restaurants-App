import { useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsProvider";
import RestaurantsOverview from "../components/RestaurantsOverview";

const Home = () => {
  const {
    restaurantsState: {
      cuisines,
      selectedCuisine,
      restaurantsDataOnCuisineBasis,
    },
    handleCuisineSelect,
  } = useContext(RestaurantsContext);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
        Food Ordering App
      </h1>

      <h4 className="text-xl my-4 font-semibold">Select Your Cuisine</h4>
      {cuisines &&
        cuisines.length > 0 &&
        cuisines.map((ele) => (
          <button
            className="focus:outline-none text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            key={ele.id}
            onClick={() => handleCuisineSelect(ele)}
          >
            {ele.name}{" "}
          </button>
        ))}
      {selectedCuisine?.name && (
        <h4 className="text-xl my-4 font-semibold">
          Selected Cuisine: {selectedCuisine.name}
        </h4>
      )}
      {restaurantsDataOnCuisineBasis &&
        restaurantsDataOnCuisineBasis.length > 0 &&
        restaurantsDataOnCuisineBasis.map((restaurantsDetails) => (
          <RestaurantsOverview
            key={restaurantsDetails.id}
            restaurantsDetails={restaurantsDetails}
          />
        ))}
    </div>
  );
};

export default Home;
