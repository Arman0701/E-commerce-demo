import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import CartPage from "./Pages/CartPage";
import AboutPage from "./Pages/AboutPage";
import SigninPage from "./Pages/SigninPage";
import CategoryPage from "./Pages/CategoryPage";

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
    );
}

export default App;
