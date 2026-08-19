import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
interface ProductCardProps {
  product: Product;
}



function ProductCard({ product }: ProductCardProps) {

  const { addToCart } = useCart();
  const { toggleWishlist, Wishlist } = useWishlist();

  const iswishlisted = Wishlist.includes(product.id);

  return (
    <>
      <div className="max-w-7xl mx-auto grid mt-10">


        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
          <div className="bg-white rounded-lg shadow-lg h-130 w-70">
            <div className="mt-4 relative">
              <NavLink to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-52 h-52 mx-auto py-4 px-4 mt-2 bg-gray-100 rounded-lg shadow-lg"
                />
              </NavLink>
              <button
                className={`absolute top-0 -right-8  ${iswishlisted
                  ? "text-red-500 "
                  : "  text-gray-500"
                  }`}
                onClick={() => toggleWishlist(product.id)}  >
                <FaHeart className="w-24 h-6" />
              </button>
            </div>

            <NavLink to={`/product/${product.id}`}>
              <h1 className="mt-2 text-green-00 mt-2 text- text-center px-2  px-2">
                {product.title}
              </h1>
            </NavLink>

            <h2 className="text-green-500 font-bold text-2xl text-center mt-2">  ${product.price} </h2>
            <h2 className="uppercase text-center uppercase font-bold mt-2">{product.category}</h2>
            <div className="mt-2 text-center flex justify-center items-center">
              <div className="mt-4 flex gap-2">
                <div className="flex bg-yellow-600 px-2 rounded-full">
                  <div>
                    <FaStar className="text-white mt-1" />
                  </div>
                  <div className="font-bold text-white ">
                    {product.rating.rate}
                  </div>
                </div>
                |<div className="text-gray-500">{product.rating.count}</div>

              </div>
            </div>
            {/* buttons */}

            <div className=" text-center  mt-10  mx-auto ">
              <button
                className="flex  text-center  mt- mx-auto items-center gap-2 bg-green-500 text-white px-4 py-2 w-fit rounded-lg hover:bg-yellow-300"
                onClick={() => addToCart(product.id)}>
                <FaShoppingCart />
                AddToCart
              </button>

            </div>
          </div>



        </div>


      </div>

    </>
  )
}
export default ProductCard;