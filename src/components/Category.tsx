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
        <div className="mt-10 mx-auto max-w-7xl  grid lg:grid-cols-[4fr_4fr] gap-5 justify-center lg:gap-60 lg:justify-between items-center">



            <select
                className="border lg:w-100 border-gray-400 py-2 rounded-lg lg:w-full w-72 mx-auto  uppercase hover:text-blue-500 "
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


            <div className=" max-w-7xl mx-auto grid grid-cols-2 justify-between items-center gap-10 md:grid-cols-4 lg:gap-5 lg:grid-cols-4 ">
                {
                    categories.map((category) => {
                        const categoryProduct = products.find(
                            (product) => product.category === category
                        );
                        return (
                            <div key={category}
                                onClick={() => setSelectedCategory(category)}
                                className="  "
                            >
                                <div className="grid  grid-cols-1 items-center justify-center gap-5 ">
                                    <div className="bg-blue-100 rounded-t-2xl w-fit py-2">

                                        <img
                                            src={categoryProduct?.image}
                                            alt={category}
                                            className="w-12 h-8 mt-4 object-contain mx-auto  cursor-pointer hover:shadow-xl "
                                        />

                                    </div>

                                    <p className=" text-xs capitalize hover:text-blue-500  uppercase">
                                        {category}
                                    </p>
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