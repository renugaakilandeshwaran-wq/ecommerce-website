import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import { api } from "../services/api";
import Category from "./Category";


function Products() {
    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [sort, setSort] = useState<string>("");

    async function fetchData() {
        try {
            const res = await api.get("/products")
            setProduct(res.data)
        } catch {
            setError("Couldn't retrive data")
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        (fetchData())
    }, []);

    const filteredProducts = product.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory == "All" ||
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;

    })


    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === "low") {
            return a.price - b.price;
        }
        if (sort === "high") {
            return b.price - a.price;
        }
        if (sort === "az") {
            return a.title.localeCompare(b.title);
        }
        return 0;
    })

    if (loading) {
        return (
            <p className="text-center text-2xl mt-50">Loading...</p>
        );

    } if (error) {
        return (
            <p className="text-center text-2xl text-red-500 mt-50">{error}</p>
        );
    }



    return (
        <>
            <div className=" max-w-7xl mx-auto mt-30 ">
                <div className="grid  lg:grid-cols-[6fr_1fr] gap-5 px-8 items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={((e) => setSearch(e.target.value))}
                        placeholder="Search  here..."
                        className="border placeholder:text-gray-500 w-full  lg:w-190 rounded-lg border-gray-500  px-3 py-2"
                    />

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className=" border-gray-500 bg-gray-500 text-white rounded-lg px-3 py-2 mt-4 lg:mt-0"
                    >
                        <option value="">Sort By</option>
                        <option value="low">Price:Low to High </option>
                        <option value="high">Price: High to Low</option>

                        <option value="az">
                            Alphabetical: A to Z
                        </option>
                    </select>



                </div>
                <div>
                    <Category
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
            </div>

            {
                filteredProducts.length === 0 ? (
                    <p>No Items Found</p>
                ) : (

                    <div className=" max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4 mt-4 justify-between items-center">
                        {
                            sortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}
export default Products;