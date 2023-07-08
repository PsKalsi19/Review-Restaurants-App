import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";
import ReviewModalForm from "./components/ReviewModalForm";

export default function App() {
  return (
    <div className="px-16 mt-32 text-center">
      <ReviewModalForm/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/restaurant" element={<RestaurantDetail/>}/>
      </Routes>
    </div>
  )
}