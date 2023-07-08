/* eslint-disable react/prop-types */
import { StarIcon } from "@heroicons/react/24/outline";

const RatingCard = ({ ratingDetails }) => {
  const { rating, comment, revName, pp } = ratingDetails;
  return (
    <div className="flex flex-col text-left border-b border-gray-400 mt-4">
      <div className="flex flex-row justify-between">
        <div className="flex items-center space-x-4">
          <img className="h-10 w-10 rounded-full" src={pp} alt={revName} />
          <p className="font-bold text-lg">{revName}</p>
        </div>

        <p className="flex mr-8 items-center h-6 font-bold px-2 text-[#F5D205] bg-[#038001] w-min rounded-md">
          {rating}
          <StarIcon className="h-3 w-3  text-[#F5D205]" />
        </p>
      </div>
      <p className="my-4 font-semibold text-lg text-gray-700">{comment}</p>
    </div>
  );
};

export default RatingCard;
