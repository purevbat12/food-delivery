"use client"
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { userType, cartType, foodType, orderType } from "../types";
import { useEmailVerify } from "../auth/emailVerify";
import { useAuth } from "../auth/authProvider";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Modal from "./Modal";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
export default function Container(){
    const { token } = useAuth();
    const [cart, setCart] = useState<cartType>();
    const [orders, setOrders] = useState<orderType[]>([]); 
    const [orderedModalIsOpen, setOrderedModalIsOpen] = useState(false);
    const [deliveryLocationModalIsOpen, setDeliveryLocationModalIsOpen] = useState(false);
    const { emailToken } = useEmailVerify();
    const [signedIn, setSignedIn] = useState(true);
    const [emailVerified, setEmailVerified] = useState(true);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [rerender, setRerender] = useState(0);
    const [user, setUser] = useState<userType>();
    const [cardModalIsOpen, setCartModalIsOpen] = useState(false);
    const [cartTab, setCartTab] = useState<"Cart" | "Order">("Cart");
    const router = useRouter();
    const [mountedCart, setMountedCart] = useState(false);
    const [mountedOrder, setMountedOrder] = useState(false);
    const [allFoods, setAllFoods] = useState<foodType[]>([]);
    function getTotalPrice(){
        let totalPrice = 0;
        if (!cart?.cartItems) return 0;
        for(let i = 0; i < cart?.cartItems.length; i++){
            for(let j = 0; j < allFoods.length; j++){
                if(cart?.cartItems[i].food == allFoods[j]._id){
                    totalPrice += cart?.cartItems[i].quantity * allFoods[j].price;
                    break;
                }
            }
        }
        return totalPrice;
    }
    useEffect(() => {
        async function getFoods(){
            await fetch(`https://food-delivery-nl5n.onrender.com/food/get-all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status + " In getFoots");
                }
                return response.json();
            }).then(data => {
                setAllFoods(data);
            });
        }
        getFoods();
    }, []);
    async function createOrder(){
        const foodOrderItems: {food: string, quantity: number}[] = cart?.cartItems as {food: string, quantity: number}[];
        if(!cart?.cartItems){
            return;
        }
        await fetch(`https://food-delivery-nl5n.onrender.com/food-order/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                user: user?._id,
                totalPrice: getTotalPrice(),
                foodOrderItems: foodOrderItems,
                status: "Pending"
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status + " In createOrder");
            }
        }).catch(err => {
            console.error(err);
        });
    }
    async function createCart(){
        await fetch(`https://food-delivery-nl5n.onrender.com/food-cart/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: user?._id
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status + " In createCart");
            }
        }).catch(err => {
            console.error(err);
        });
    }
    async function updateCart(id: string, updates: unknown){
        await fetch(`https://food-delivery-nl5n.onrender.com/food-cart/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                id: id,
                updates: updates
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status + " In updateCart");
            }
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setRerender(rerender + 1);
        });
    }
    useEffect(() => {
        async function getOrders(){
            await fetch(`https://food-delivery-nl5n.onrender.com/food-order/get-orders-of-user/${user?._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status " + response.status + " In getOrders");
                }
                return response.json();
            }).then(data => {
                if(data.message != "No orders placed on this user!"){ 
                    setMountedOrder(true);
                }
                setOrders(data);
            }).catch(err => {
                console.error(err);
            });
        }
        async function getCart(){
            await fetch(`https://food-delivery-nl5n.onrender.com/food-cart/get/${user?._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status + " In getCart.");
                }
                return response.json();
            }).then(data => {
                if(data == null || data == undefined){
                    createCart();
                    return;
                }
                if(data.cartItems.length != 0){
                    setMountedCart(true);
                }
                setCart(data);
            }).catch(err => {
                console.error(err);
            });
        }
        if(user){
            getCart();
            getOrders();
        }
    }, [user, rerender]);
    async function sendEmail(){
        await fetch(`https://food-delivery-nl5n.onrender.com/auth/verify-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user?.email,
                token: token
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status);
            }
        }).catch(err => {
            console.error(err);
        });
    }
    useEffect(() => {
        async function getUser(){
            const token = localStorage.getItem("token") as string;
            let decoded;
            if(token){
                decoded = jwt.decode(token) as {userId: string, exp: number};
            }
            if(decoded?.exp){
                const expired = decoded.exp * 1000 < Date.now();
                setTokenExpired(expired);
            }
            const id = decoded?.userId;
            await fetch(`https://food-delivery-nl5n.onrender.com/auth/get/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.json();
            }).then(data => {
                setUser(data);
            }).catch(err => {
                console.error(err);
            });
        }
        if(localStorage.getItem("token") == null){
            setSignedIn(false);
        }
        else{
            getUser();
        }
    }, [emailToken, rerender]);
    useEffect(() => {
        if(user != null){
            setEmailVerified(user.isVerified);
        }
    }, [user]);
    useEffect(() => {
        if(tokenExpired){
            console.log("Removed the token.");
            localStorage.removeItem("token");
            router.push("/auth/sign-in");
        }
    }, [tokenExpired]);
    useEffect(() => {
        if(user){
            if(!user.isVerified){
                sendEmail();
            }
        }
    }, [user]);
    if(user && user?.role != "User"){
        console.log("Not user");
        router.push("/admin");
    }
    if(!signedIn){
        return (
            <div className="w-[100vw] h-[100vh] bg-[#000000] flex justify-center items-center">
                <div className="rounded-[6px] bg-[#FFFFFF] p-[16px] flex flex-col gap-[20px] items-center">
                    <h1 className="text-[16px] font-[500]">You are not signed in.</h1>
                    <div className="flex gap-[20px]">
                        <button className="bg-[#000000] text-[#FFFFFF] py-[8px] px-[16px] rounded-[9999px] cursor-pointer" onClick={() => {
                            router.push("/auth/sign-in");
                        }}>Sign in</button>
                        <button className="bg-[#000000] text-[#FFFFFF] py-[8px] px-[16px] rounded-[9999px] cursor-pointer" onClick={() => {
                            router.push("/auth/sign-up");
                        }}>Sign up</button>
                    </div>
                </div>
            </div>
        );
    }
    if(!emailVerified){
        return (
            <div className="bg-[#000000] h-[100vh] w-[100vw] flex justify-center items-center">
                <div className="rounded-[6px] bg-[#FFFFFF] flex flex-col gap-[20px] p-[16px] items-center">
                    <h1 className="text-[20px] font-[600]">You have not verified your email.</h1>
                    <p>We have sent an email to {user?.email}</p>
                    <button onClick={() => {
                        sendEmail();
                    }} className="bg-[#000000] text-[#FFFFFF] rounded-[9999px] py-[8px] px-[12px] cursor-pointer">Resend email</button>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-[#404040]">
            <Header user={user as userType} rerenderState={{value: rerender, setter: setRerender}} cardModalIsOpenState={{value: cardModalIsOpen, setter: setCartModalIsOpen}} deliveryLocationModalIsOpenState={{value: deliveryLocationModalIsOpen, setter: setDeliveryLocationModalIsOpen}}/>
            <Main rerenderState={{value: rerender, setter: setRerender}}/>
            <Footer/>
            <Modal isOpenState={{value: cardModalIsOpen, setter: setCartModalIsOpen}}>
                <br></br>
                <div>
                    <header className="flex flex-col gap-[28px]">
                        <div className="flex gap-[10px]">
                            <img src="/images/icons/ShoppingCartIcon.png" className="w-[16px] h-[16px] mt-[6px]"></img>
                            <h2 className="text-[#FAFAFA] text-[20px] font-[600]">Order detail</h2>
                        </div>
                        <div className="bg-[#FFFFFF] rounded-[9999px] p-[4px] flex justify-center">
                            <button onClick={() => {
                                setCartTab("Cart");
                            }} style={{color: cartTab == "Cart" ? "#FFFFFF" : "#000000", backgroundColor: cartTab == "Cart" ? "#EF4444" : "#FFFFFF"}} className="w-[227.5px] rounded-[9999px] px-[8px] py-[4px] cursor-pointer">Cart</button>
                            <button onClick={() => {
                                setCartTab("Order");
                            }} style={{color: cartTab == "Order" ? "#FFFFFF" : "#000000", backgroundColor: cartTab == "Order" ? "#EF4444" : "#FFFFFF"}} className="w-[227.5px] rounded-[9999px] px-[8px] py-[4px] cursor-pointer">Order</button>
                        </div>
                    </header>
                    {
                        cartTab == "Cart" ? (
                            <div className="flex flex-col gap-[24px] mt-[24px]">
                                <div className="p-[16px] rounded-[20px] bg-[#FFFFFF] flex flex-col gap-[24px]">
                                    <h2 className="text-[#71717A] text-[20px] font-[600]">My cart</h2>
                                    {
                                        mountedCart ? 
                                            <div className="flex flex-col gap-[40px]">
                                                {
                                                    cart?.cartItems.map((cartItem, cartItemIndex) => {                                                        
                                                        const results = allFoods?.filter((food) => {
                                                            return food._id == cartItem.food;
                                                        });
                                                        return (
                                                            <div key={cartItemIndex} className="flex gap-[10px]">
                                                                <img src={results[0].image} className="w-[124px] rounded-[12px]"></img>
                                                                <div className="flex flex-col gap-[24px]">
                                                                    <div className="flex gap-[100px]">
                                                                        <div>
                                                                            <h2 className="text-[#EF4444] text-[16px] font-[700]">{results[0].foodName}</h2>
                                                                            <p>{results[0].ingredients}</p>
                                                                        </div>
                                                                        <button onClick={() => {
                                                                            const newCartItems = cart.cartItems;
                                                                            newCartItems.splice(cartItemIndex, 1);
                                                                            updateCart(cart._id, {cartItems: newCartItems});
                                                                        }} className="border rounded-[100%] w-[36px] h-[36px] border-[#EF4444] text-[#EF4444] cursor-pointer">✕</button>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <div className="flex gap-[5px] items-center">
                                                                            <button onClick={() => {
                                                                                if(cartItem.quantity == 1){
                                                                                    return;
                                                                                }
                                                                                const newCartItems = cart.cartItems;
                                                                                newCartItems[cartItemIndex].quantity -= 1;
                                                                                updateCart(cart._id, {cartItems: newCartItems});
                                                                            }} className="border-none text-[20px] font-[600] cursor-pointer">-</button>
                                                                            <p className="font-[600] mx-[5px] text-[18px]">{cartItem.quantity}</p>
                                                                            <button onClick={() => {
                                                                                const newCartItems = cart.cartItems;
                                                                                newCartItems[cartItemIndex].quantity += 1;
                                                                                updateCart(cart._id, {cartItems: newCartItems});
                                                                            }} className="border-none text-[20px] font-[600] cursor-pointer">+</button>
                                                                        </div>
                                                                        <p className="text-[16px] font-[700]">${results[0].price * cartItem.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                <h2 className="mt-[56px] text-[#71717A] text-[20px] font-[600]">Delivery location</h2>
                                                <div className="rounded-[6px] border py-[8px] px-[12px]">
                                                    <p className="text-[#09090B] text-[14px] font-[400]">{user?.address}</p>
                                                </div>
                                            </div>
                                        :
                                        <div className="bg-[#F4F4F5] rounded-[12px] w-[439px] h-[182px] flex flex-col justify-center items-center px-[40px]">
                                            <h2 className="text-[#09090B] text-[16px] font-[700]">Your cart is empty</h2>
                                            <p className="text-[#71717A] text-[12px] font-[400] text-center">Hungry? 🍔 Add some delicious dishes to your cart and satisfy your cravings!</p>
                                        </div>
                                    }
                                </div>
                                <div className="p-[16px] rounded-[20px] bg-[#FFFFFF] flex flex-col gap-[24px]"> 
                                    <h2 className="text-[#71717A] text-[20px] font-[600]">Payment info</h2>
                                    <div className="flex justify-between">
                                        <p className="text-[#71717A] text-[16px] font-[400]">Items</p>
                                        <p className="text-[#09090B] text-[16px] font-[700]">${getTotalPrice()}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[#71717A] text-[16px] font-[400]">Shipping</p>
                                        <p className="text-[#09090B] text-[16px] font-[700]">$0.99</p>
                                    </div>
                                    <div style={{borderTop: "1px dashed #71717A"}} className="mt-[10px] mb-[2.5px]"></div>
                                    <div className="py-[20px] flex justify-between">
                                        <p className="text-[#71717A] text-[16px] font-[400]">Total</p>
                                        <p className="text-[#09090B] text-[16px] font-[700]">${getTotalPrice() + 0.99}</p>
                                    </div>
                                    <button onClick={() => {
                                        if(user?.address != ""){
                                            setOrderedModalIsOpen(true);
                                            createOrder();
                                            updateCart(cart?._id as string, {cartItems: []});
                                        }
                                        else{
                                            setDeliveryLocationModalIsOpen(true);
                                        }
                                    }} className="bg-[#EF4444] text-[#FAFAFA] rounded-[9999px] w-[419px] py-[8px] cursor-pointer" style={{opacity: cart?.cartItems.length == 0 ? "0.2" : "1.0"}}>Checkout</button>
                                    <Dialog open={orderedModalIsOpen} onOpenChange={setOrderedModalIsOpen}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Your order has been successfully placed!</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex justify-center items-center">
                                                <img src="/images/illustration.png" className="w-[156px]"></img>
                                            </div>
                                            <DialogFooter >
                                                <DialogClose asChild>
                                                    <Button onClick={() => {
                                                        setOrderedModalIsOpen(false);
                                                        setCartModalIsOpen(false);
                                                    }}>Back to Home</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-[24px]">
                                <div className="p-[16px] rounded-[20px] bg-[#FFFFFF] flex flex-col gap-[20px]">
                                    <h2 className="text-[#71717A] text-[20px] font-[600]">Order history</h2>
                                        {
                                            mountedOrder ? (
                                                <div className="flex flex-col gap-[20px]">
                                                    {
                                                        orders.map((order, orderIndex) => {
                                                            return (
                                                                <>
                                                                    <div key={orderIndex} className="px-[12px] flex flex-col gap-[12px] mb-[20px]">
                                                                        <div className="flex justify-between">
                                                                            <h2 className="text-[16px] text-[#09090B] font-[700]">${order.totalPrice}</h2>
                                                                            <p className="border text-[#71717A] text-[12px] font-[600] rounded-[9999px] py-[4px] px-[10px]" style={{borderColor: order.status == "Pending" ? "#EF4444" : "#F4F4F5"}}>{order.status}</p>
                                                                        </div>
                                                                        {
                                                                            orders[orderIndex].foodOrderItems.map((foodItem, foodItemIndex) => {
                                                                                const results = allFoods?.filter((food) => {
                                                                                    return food._id == foodItem.food;
                                                                                });
                                                                                return (
                                                                                    <div className="flex justify-between" key={foodItemIndex}>
                                                                                        <p className="text-[16px] text-[#71717A] font-[400]">{results[0].foodName}</p>
                                                                                        <p>X {foodItem.quantity}</p>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        <p className="text-[16px] text-[#71717A] font-[400]">{user?.address}</p>
                                                                    </div>
                                                                    <div style={{borderTop: "1px dashed #71717A"}} className="my-[10px]"></div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : (
                                                <div className="bg-[#F4F4F5] rounded-[12px] w-[439px] h-[182px] flex flex-col justify-center items-center px-[40px]">
                                                    <h2 className="text-[#09090B] text-[16px] font-[700]">No orders yet?</h2>
                                                    <p className="text-[#71717A] text-[12px] font-[400] text-center">You haven&apos;t placed any orders yet. Start exploring our menu and satisfy your cravings!</p>
                                                </div>
                                            )
                                        }
                                </div>
                            </div>
                        )
                    }
                </div>
            </Modal>
        </div>
    );
}