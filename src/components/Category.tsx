import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/Product";
interface CategoryProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

function Category({
    selectedCategory,
    setSelectedCategory
}: CategoryProps) {

    const [categories, setCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    async function fetchCategories() {
        try {
            const categoryRes = await api.get("/products/categories");
            const ProductRes = await api.get("/products")
            setCategories(categoryRes.data);
            setProducts(ProductRes.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="mt-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-[4fr_4fr] gap-10 justify-center lg:gap-60 lg:justify-between lg:items-center">

            <div className="px-10 lg:px-2">


                <select
                    className="text-white   bg-yellow-500 shadow-lg w-full lg:w-100 border-gray-400 py-2 rounded-lg  mx-auto uppercase hover:text-blue-500 "
                    aria-placeholder="All Categories"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>

                    {categories.map((category) => (
                        <option
                            value={category}
                            key={category}

                        >
                            {category}
                        </option>
                    ))}
                </select>
            </div>


            <div className=" max-w-7xl mx-auto flex px-8  justify-between items-center gap-10 md:grid-cols-4 lg:gap-5 lg:grid-cols-4 ">
                {
                    categories.map((category) => {
                        const categoryProduct = products.find(
                            (product) => product.category === category
                        );
                        return (
                            <div key={category}
                                onClick={() => setSelectedCategory(category)}
                                className="grid  lg:flex-cols-2   lg:justify-between items-center  gap-5  "
                            >
                                <div className=" mx-auto ">
                                    <div className="bg-blue-100 lg:w-32  w-14 lg:h-fit  h-12 rounded-t-2xl py-2">

                                        <img
                                            src={categoryProduct?.image}
                                            alt={category}
                                            className="w-12 h-8 mt-2 py-1 object-contain mx-auto cursor-pointer hover:shadow-xl "
                                        />
                                        <div className="">
                                            <p className=" text-xs capitalize tracking-tighter hover:text-blue-500 text-center mt-4 lg:mt-4 mb-4 uppercase mt-2">
                                                {category}
                                            </p>
                                        </div>
                                    </div>


                                </div>


                            </div>

                        )
                    })
                }
            </div>



        </div>
    );
}

export default Category;