/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";
import { cuisineData, restaurantsData } from "../database/appData";
import RestaurantsActions from "./ALL_ACTIONS";
import { useNavigate } from "react-router-dom";

const initialState = {
  cuisines: cuisineData,
  restaurants: restaurantsData,
  selectedCuisine: {},
  selectedRestaurant: {},
  restaurantsDataOnCuisineBasis: [],
  toggleReviewModal: false,
};

const defaultUser = {
  name: "Prabhjot",
  pp: "https://ik.imagekit.io/pb97gg2as/Ping-Connnect/Avatars/_020d6743-7a2d-4329-8cf2-19e4fd779812.jpg?updatedAt=1686940612243",
};

const restaurantsReducer = (state, { type, payload }) => {
  switch (type) {
    case RestaurantsActions.SELECT_CUISINE:
      return { ...state, selectedCuisine: payload };

    case RestaurantsActions.SET_RESTAURANTS_BY_CUISINE:
      return { ...state, restaurantsDataOnCuisineBasis: payload };

    case RestaurantsActions.SET_SELECTED_RESTAURANT:
      return { ...state, selectedRestaurant: payload };

    case RestaurantsActions.UPDATE_REVIEW:
      return {
        ...state,
        restaurants: updateReview(
          payload,
          state.selectedRestaurant,
          state.restaurants
        ),
      };

    case RestaurantsActions.TOGGLE_MODAL:
      return { ...state, toggleReviewModal: payload };

    default:
      return state;
  }
};

const updateReview = ({ form }, selectedRestaurant, allRestaurants) => {
  const updatedSelectedRestaurant = {
    ...selectedRestaurant,
    ratings: [...selectedRestaurant.ratings, { ...form, ...defaultUser }],
  };

  return allRestaurants.map((ele) =>
    ele.id === updatedSelectedRestaurant.id
      ? { updatedSelectedRestaurant }
      : ele
  );
};

export const RestaurantsContext = createContext();
// eslint-disable-next-line react/prop-types
const RestaurantsProvider = ({ children }) => {
  const [restaurantsState, dispatchRestaurants] = useReducer(
    restaurantsReducer,
    initialState
  );

  const navigate = useNavigate();

  const handleCuisineSelect = (data) => {
    dispatchRestaurants({
      type: RestaurantsActions.SELECT_CUISINE,
      payload: data,
    });
    setDataOnCuisineBasis(data.id);
  };

  const setDataOnCuisineBasis = (id) => {
    const data = restaurantsState.restaurants.filter(
      (res) => res.cuisine_id === id
    );
    dispatchRestaurants({
      type: RestaurantsActions.SET_RESTAURANTS_BY_CUISINE,
      payload: data,
    });
  };

  const handleRestaurantSelect = (selectedRestaurant) => {
    dispatchRestaurants({
      type: RestaurantsActions.SET_SELECTED_RESTAURANT,
      payload: selectedRestaurant,
    });
    navigate("/restaurant");
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurantsState,
        dispatchRestaurants,
        handleCuisineSelect,
        handleRestaurantSelect,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsProvider;
