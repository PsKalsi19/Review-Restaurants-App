import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";

export default function App() {
  return (
    <div className="px-16 mt-32 text-center">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/restaurant" element={<RestaurantDetail/>}/>
      </Routes>
    </div>
  )
}