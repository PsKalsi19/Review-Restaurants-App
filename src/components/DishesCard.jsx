/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const DishesCard = ({menuDetails,restaurantsDetails}) => {
    const {name,imgSrc,price,qty}=menuDetails
    return (
        <Link to="/restaurant" state={restaurantsDetails} className='flex w-72 pb-4 rounded-md h-[22rem] space-y-8 bg-white shadow-sm border-2 border-gray-100 flex-col'>
            <img className="h-56 w-72" src={imgSrc} alt={name} />
            <div className="text-left px-4">
                <h3 className="font-bold text-gray-900 text-xl">{name} </h3>
                <p className="text-gray-600 font-semibold text-base"> Rs {price} for {qty} </p>
                <p className="text-gray-600 font-semibold text-base"> {restaurantsDetails.name} </p>

            </div>
        </Link>
    );
};

export default DishesCard;