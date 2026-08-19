import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { addToCart } = useCart();
    const { toggleWishlist, Wishlist } = useWishlist();

    const isWishlisted = product
        ? Wishlist.includes(product.id)
        : false;

    useEffect(() => {

        async function fetchProduct() {

            try {

                const res = await api.get(`/products/${id}`);

                setProduct(res.data);

            } catch (error) {

                console.log(error);
                setError("Couldn't retrieve product");

            } finally {

                setLoading(false);

            }
        }

        fetchProduct();

    }, [id]);


    if (loading) {
        return (
            <p className="text-center text-2xl mt-50">
                Loading...
            </p>
        );
    }


    if (error) {
        return (
            <p className="text-center text-2xl text-red-500 mt-50">
                {error}
            </p>
        );
    }


    if (!product) {
        return (
            <p className="text-center text-2xl mt-50">
                Product not found
            </p>
        );
    }


    return (
        <div className="max-w-7xl mx-auto mt-20 px-5">

            <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* IMAGE */}

                <div className="bg-gray-100 rounded-xl p-10">

                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-100 object-contain"
                    />

                </div>


                {/* DETAILS */}

                <div>

                    <p className="uppercase text-gray-500 font-semibold">
                        {product.category}
                    </p>

                    <h1 className="text-3xl font-bold mt-3">
                        {product.title}
                    </h1>

                    {/* Rating */}

                    <div className="flex items-center gap-3 mt-5">

                        <div className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-full">

                            <FaStar />

                            <span>
                                {product.rating.rate}
                            </span>

                        </div>

                        <span className="text-gray-500">
                            {product.rating.count} reviews
                        </span>

                    </div>


                    {/* PRICE */}

                    <h2 className="text-3xl font-bold text-green-500 mt-6">
                        ${product.price}
                    </h2>


                    {/* DESCRIPTION */}

                    <p className="text-gray-600 leading-7 mt-6">
                        {product.description}
                    </p>


                    {/* BUTTONS */}

                    <div className="flex gap-4 mt-8">

                        <button
                            onClick={() => addToCart(product.id)}
                            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                        >
                            <FaShoppingCart />
                            Add to Cart
                        </button>


                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`px-5 py-3 rounded-lg border ${isWishlisted
                                ? "text-red-500 border-red-500"
                                : "text-gray-500 border-gray-400"
                                }`}
                        >
                            <FaHeart />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;