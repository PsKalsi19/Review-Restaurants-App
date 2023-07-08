import { XCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantsProvider";
import RestaurantsActions from "../context/ALL_ACTIONS";

const ReviewModalForm = () => {
  const {
    restaurantsState: { toggleReviewModal },
    dispatchRestaurants,
  } = useContext(RestaurantsContext);

  const [form, setForm] = useState({
    comment: "",
    rating: null,
  });

  const handleFormChange = (e) => {
    setForm((prevVal) => ({ ...prevVal, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchRestaurants({
      type: RestaurantsActions.UPDATE_REVIEW,
      payload: { form },
    });

    dispatchRestaurants({
      type: RestaurantsActions.TOGGLE_MODAL,
      payload: false,
    });
    setForm({
      comment: "",
      rating: null,
    });
  };

  return (
    <Transition appear show={toggleReviewModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() =>
          dispatchRestaurants({
            type: RestaurantsActions.TOGGLE_MODAL,
            payload: false,
          })
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-red-400 p-6 text-left align-middle shadow-xl transition-all">
                <form onSubmit={handleSubmit}>
                  <XCircleIcon
                    onClick={() =>
                      dispatchRestaurants({
                        type: RestaurantsActions.TOGGLE_MODAL,
                        payload: false,
                      })
                    }
                    className="h-6 absolute cursor-pointer float-left w-6 text-gray-50"
                  />

                  <h4 className="text-2xl  text-center mb-4 pb-8 border-b border-gray-50 font-medium leading-6 text-gray-50">
                    {" "}
                    Add Your Review
                  </h4>
                  <div className="grid my-4 grid-cols-2">
                    <label
                      htmlFor="ratings"
                      className="block mb-2 text-sm font-medium  text-gray-50"
                    >
                      Rating:
                    </label>
                    <select
                      id="ratings"
                      name="rating"
                      value={form.rating}
                      onChange={handleFormChange}
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5   placeholder-gray-400 text-gray-700 focus:ring-red-500 focus:border-red-500"
                    >
                      <option selected>Select Rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="grid my-4 grid-cols-2">
                    <label
                      htmlFor="comment"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Comment:
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={form.comment}
                      onChange={handleFormChange}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 resize-none placeholder-gray-400  focus:ring-red-500 focus:border-red-500"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="rounded-md border w-auto px-8 py-2 bg-gray-50 text-gray-900 font-bold"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewModalForm;
