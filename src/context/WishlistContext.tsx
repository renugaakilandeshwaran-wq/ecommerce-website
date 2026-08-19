import { createContext, useContext, useState, useEffect } from "react";


type WishlistContexttype = {
    Wishlist: number[];
    toggleWishlist: (id: number) => void;
};

const WishlistContext =
    createContext<WishlistContexttype | null>(null);

export const WishlistProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // when we refreshed   wislist item  will not remove  the  wishlist it producted by localstorage 

    const [Wishlist, setWishlist] = useState<number[]>(() => {
        const savedWishlist = localStorage.getItem("wishlist");

        return savedWishlist
            ? JSON.parse(savedWishlist)
            : [];
    });
    const toggleWishlist = (id: number) => {
        if (Wishlist.includes(id)) {

            setWishlist(Wishlist.filter((item) => item !== id));
        } else {
            setWishlist([...Wishlist, id]);
        }
    };
    useEffect(() => {
        localStorage.setItem(
            "wishlist",
            JSON.stringify(Wishlist)
        );
    }, [Wishlist]);
    return (
        <WishlistContext.Provider
            value={{ Wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    )

};





export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be use inside WishlistProvider");
    } return context;
};

















