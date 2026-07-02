import { createContext,useContext,useState,useEffect } from "react";
import {authFetch,getAccessToken} from "../utils/auth"
const CartContext= createContext()

export const CartProvider=({children})=>{

let [cartItems,setCartItems]=useState([])
const [total,setTotal]=useState(0)
const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL;

//fetch cart from backend
const fetchCart= async()=>{
    try{
        const response= await authFetch(`${BASEURL}/api/cart`)
        const data=await response.json()
        setCartItems(data.items || [])
        setTotal(data.total || 0)
    }
    catch(error){
        console.error("error in fetching cart",error)
    }
}

useEffect(()=>{
    fetchCart()
},[])
//add product to cart
const addToCart= async(productId)=>{
    try {
        const response = await authFetch(`${BASEURL}/api/cart/add/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId }),
        });
        
        if (response.ok) {
            await fetchCart();
        }
    } catch (error) {
        console.error("Cart Error:", error);
    }
}

//remove from cart
const removeFromCart=async(itemId)=>{
    try{
        const response=await authFetch(`${BASEURL}/api/cart/remove/`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({item_id:itemId}),
        });
        if (response.ok) {
            console.log("Added successfully!");
            await fetchCart(); 
    }
}
    catch(error){
        console.error("error in fetching cart",error)
    }
}

//update quantity
const updateQuantity=async(itemId,quantity)=>{
    if(quantity<1){
        await removeFromCart(itemId)
        return
    }
try{
        const response=await authFetch(`${BASEURL}/api/cart/update/`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({item_id:itemId,quantity}),
        });
        if (response.ok) {
            console.log("Added successfully!");
            await fetchCart(); 
        }
    }
    catch(error){
        console.error("error in fetching cart",error)
    }
}

//clear cart
const clearCart=()=>{
    setCartItems([])
    setTotal(0)
}

return(
    <CartContext.Provider value={{cartItems,total,addToCart,removeFromCart,updateQuantity,clearCart}}>
        {children}
    </CartContext.Provider>
)
}

export const useCart =()=> useContext(CartContext)