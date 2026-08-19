import { useEffect, useState, } from "react";
import type { Product } from "../types/Product";
import { api } from "../services/api";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";



function Wishlist() {

    const { Wishlist } = useWishlist();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);



    useEffect(() => {
        async function fetchProducts() {
            try {

                const res = await api.get("/products");
                setProducts(res.data);
            } catch (error) {
                console.log(error)
                setError("Couldn't retrive data")
            } finally {
                setLoading(false);
            }

        }
        fetchProducts();

    }, []);
    const WishlistProducts = products.filter(
        (product) => Wishlist.includes(product.id)
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



    return (
        <div className="max-w-7xl mx-auto mt-20 px-5">
            <h1 className="text-3xl font-bold text-center mb-8">
                ❤️ My Wishlist
            </h1>
            {
                WishlistProducts.length === 0 ? (
                    <p className="text-center text-xl text-gray-500 mt-20">
                        Your wishlist is empty</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">                        {
                        WishlistProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))
                    }
                    </div>
                )
            }


        </div>
    )
}
export default Wishlist;