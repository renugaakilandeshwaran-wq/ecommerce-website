import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchProducts() {

            try {

                const res = await api.get("/products");

                setProducts(res.data);

            } catch (err) {

                console.log(err);
                setError("Couldn't retrieve data");

            } finally {

                setLoading(false);

            }
        }

        fetchProducts();

    }, []);

    const cartProducts = products.filter((product) =>
        cart.some((item) => item.id === product.id)
    );

    const subtotal = cartProducts.reduce((total, product) => {

        const cartItem = cart.find(
            (item) => item.id === product.id
        );

        return total + product.price * (cartItem?.quantity ?? 0);

    }, 0);

    const shipping = cartProducts.length > 0 ? 20 : 0;

    const tax = cartProducts.length > 0 ? 15 : 0;

    const total = subtotal + shipping + tax;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

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


    if (cart.length === 0) {
        return (
            <div className="text-center mt-30">

                <h1 className="text-3xl font-bold">
                    Your Cart is Empty 🛒
                </h1>

                <p className="text-gray-500 mt-3">
                    Add some products to your cart.
                </p>

            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto mt-20 px-5 ">

            <h1 className="text-3xl font-bold mb-8 text-center">
                🛒 My Cart
            </h1>


            <div className="grid lg:grid-cols-3 gap-5 lg:gap-8">

                {/* CART PRODUCTS */}

                <div className="lg:col-span-2 space-y-5">

                    {cartProducts.map((product) => {

                        const cartItem = cart.find(
                            (item) => item.id === product.id
                        );

                        const quantity = cartItem?.quantity ?? 1;

                        return (

                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-xl p-5 flex flex-col sm:flex-row     items-center gap-5"
                            >

                                {/* IMAGE */}

                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-28 h-28 object-contain bg-gray-100 rounded-lg p-2"
                                />


                                {/* DETAILS */}

                                <div className="flex-1">

                                    <h2 className="font-semibold">
                                        {product.title}
                                    </h2>

                                    <p className="text-green-500 font-bold text-xl mt-2">
                                        ${product.price}
                                    </p>


                                    {/* QUANTITY */}

                                    <div className="flex items-center gap-3 mt-4">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(product.id)
                                            }
                                            className="bg-red-500  text-white  p-2 rounded"
                                        >
                                            <FaMinus />
                                        </button>

                                        <span className="font-bold">
                                            {quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(product.id)
                                            }
                                            className="bg-green-500 text-white p-2 rounded"
                                        >
                                            <FaPlus />
                                        </button>

                                    </div>

                                </div>


                                {/* ITEM TOTAL */}

                                <div className=" relative">

                                    <p className="font-bold border border-gray-100 shadow-lg px-4 py-1  mt-4 rounded-lg text-lg ">
                                        ${(product.price * quantity).toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() =>
                                            removeFromCart(product.id)
                                        }
                                        className="text-red-500 mt- absolute -top-70 -right-30  md:-top-8 md:left-10 lg:-top-8 lg:right-5"
                                    >
                                        <FaTrash />
                                    </button>

                                </div>


                            </div>

                        );
                    })}

                </div>


                {/* SUMMARY */}

                <div className="bg-gray-100 rounded-xl p-6 h-fit w-full grid ">

                    <h2 className="text-2xl font-bold mb-5">
                        Order Summary
                    </h2>
                    <div className="flex justify-between mb-3">
                        <span>Total Items</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-3">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-5">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-xl font-bold mt-5">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link to="/login" className="">
                        <button className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600">
                            Checkout
                        </button>
                    </Link>





                </div>

            </div>

        </div>
    );
}

export default Cart;