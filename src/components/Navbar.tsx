import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Navbar() {
    const { cart } = useCart();
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const { Wishlist } = useWishlist();
    return (
        <>
            <nav className="fixed top-0 left-0 z-50 rounded-lg right-0 bg-blue-900  lg:max-w-7xl mx-auto px-10 lg:px-4 py-4 lg:text-xl">
                <div className="flex justify-center lg:justify-between md:justify-between  gap-8 items-center px-8 text-white">
                    <NavLink to="/" className="bg-pink-500 text-white rounded-full px-2 py-1 text-xs">ɱɘɘʂɧŏ</NavLink>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Product</NavLink>
                    <Link to="/wishlist">
                        <div className="relative">

                            <FiHeart className=" text-white" />

                            {Wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1  rounded-full w-4 h-4 flex items-center justify-center">
                                    {Wishlist.length}
                                </span>
                            )}

                        </div>
                    </Link>
                    <div className="relative">
                        <NavLink to="/cart">
                            <FiShoppingCart />
                            <span className="bg-green-500 absolute -top-2 -right-4 text-white text-center text-xs px-1 w-4 h-4 rounded-full">{totalItems}</span></NavLink>

                    </div>
                    <div>
                        <NavLink to="/login">Login</NavLink>

                    </div>
                </div>
            </nav >

        </>


    )
}

export default Navbar;