import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal, removeItem, decreaseItemQuantity, increaseItemQuantity, } from "../features/cartSlice";

const CartPage = () => {
    const { cart, totalQuantity, totalPrice } = useSelector(
        (state) => state.allCart
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart]);

    return (
        <div>
            <div id='head'>
                <Link to='/'><h1>shopping time</h1></Link>
            </div>
            <div id="outertwo">
                <div id="innerone">
                    <h1>Cart {cart.length}</h1>
                    {cart.map((data) => (
                        <div id="cartpro" key={data.id}>
                            <img src={data.image} alt='not showing' height='250px' width='200px' />
                            <h1>{data.name}</h1>
                            <button id="remove" onClick={() => dispatch(removeItem(data.id))}>remove</button>
                            <button id="add" onClick={() => dispatch(increaseItemQuantity(data.id))}>+</button>
                            <p id="val">{data.quantity}</p>
                            <button id="minus" onClick={() => dispatch(decreaseItemQuantity(data.id))}>-</button>
                            <p id="price">Price: {data.price}</p>
                        </div>
                    ))}
                </div>
                <div id="innertwo">
                    <h1>Summary</h1>
                    <h4>Total quantity<span>{totalQuantity}</span></h4>
                    <h4>Total Amount<span>{totalPrice}</span></h4>
                    <button id="checkout">Checkout</button>
                </div>
            </div>
        </div>
    )
}
export default CartPage