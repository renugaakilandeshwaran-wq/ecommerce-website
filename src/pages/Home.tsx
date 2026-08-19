import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/Product";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";


function Home() {

    const [product, setProduct] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [selectedCategory, setselectedCategory] = useState<string>("All");
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true);


    async function fetchData() {
        try {
            const res = await api.get("/products")

            setProduct(res.data)
        } catch (err) {
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

            selectedCategory === "All" ||
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;


    });

    if (loading) {
        return (
            <p className="text-center text-2xl mt-50">Loading...</p>

        );
    } if (error) {
        return (
            <p className="text-center text-2xl text-red-500 mt-50">{error}</p>
        );
    }

    //sorting

    return (
        <main className="max-w-7xl mx-auto mt-20">


            <div className="px-8 ">
                <div className=" ">
                    <div>
                        <input type="text"
                            value={search}
                            onChange={((e) => setSearch(e.target.value))}
                            className="border w-full lg:w-190  rounded-lg border-gray-400 px-3 py-2 mt-10"
                            placeholder="Search here..."
                        />
                    </div>
                    <Category
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setselectedCategory}
                    />
                </div>


                {filteredProducts.length === 0 ? (
                    <p className="text-center text-2xl text-red-500">No Items Found</p>) : (




                    <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4 mt-4 justify-between items-center ">
                        {filteredProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}

                            />


                        ))}
                    </div>
                )



                }


            </div>


        </main>
    )
}
export default Home;