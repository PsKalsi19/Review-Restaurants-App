/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";
import { cuisineData, restaurantsData } from "../database/appData";
import RestaurantsActions from "./ALL_ACTIONS";

const initialState = {
  cuisines: cuisineData,
  restaurants: restaurantsData,
  selectedCuisine: {},
  restaurantsDataOnCuisineBasis: [],
};

const restaurantsReducer = (state, { type, payload }) => {
  switch (type) {
    case RestaurantsActions.SELECT_CUISINE:
      return { ...state, selectedCuisine: payload };

    case RestaurantsActions.SET_RESTAURANTS_BY_CUISINE:
      return { ...state, restaurantsDataOnCuisineBasis: payload };

    default:
      return state;
  }
};

export const RestaurantsContext = createContext();
// eslint-disable-next-line react/prop-types
const RestaurantsProvider = ({ children }) => {
  const [restaurantsState, dispatchRestaurants] = useReducer(
    restaurantsReducer,
    initialState
  );

  const handleCuisineSelect = (data) => {
    dispatchRestaurants({
      type: RestaurantsActions.SELECT_CUISINE,
      payload: data,
    });
    setDataOnCuisineBasis(data.id)
  };

  const setDataOnCuisineBasis=(id)=>{
    const data= restaurantsState.restaurants.filter(res=>res.cuisine_id===id);
    dispatchRestaurants({type:RestaurantsActions.SET_RESTAURANTS_BY_CUISINE,payload:data})
  }

  return (
    <RestaurantsContext.Provider
      value={{
        restaurantsState,
        dispatchRestaurants,
        handleCuisineSelect,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsProvider;
