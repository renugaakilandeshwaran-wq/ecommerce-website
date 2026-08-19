import { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
    id: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [cart, setCart] = useState<CartItem[]>(() => {
        const saveCart = localStorage.getItem("cart");
        return saveCart
            ? JSON.parse(saveCart)
            : [];
    });

    // ADD TO CART
    const addToCart = (id: number) => {

        const existingItem = cart.find(
            (item) => item.id === id
        );

        if (existingItem) {

            setCart(
                cart.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    id: id,
                    quantity: 1,
                }
            ]);

        }
    };


    // REMOVE FROM CART
    const removeFromCart = (id: number) => {

        setCart(
            cart.filter((item) => item.id !== id)
        );

    };


    // INCREASE QUANTITY
    const increaseQuantity = (id: number) => {

        setCart(
            cart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );

    };


    // DECREASE QUANTITY
    const decreaseQuantity = (id: number) => {

        setCart(
            cart.map((item) =>
                item.id === id && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            )
        );

    };

    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }, [cart]);
    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside the CartProvider"
        );
    }

    return context;
};