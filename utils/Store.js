import {createContext, useReducer} from 'react'
import Cookies from 'js-cookie'

export const Store = createContext()
const initalState = {
    darkMode: false,
    cart:{
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')): [],
        shippingAddress:  Cookies.get('shippingAddress') ? JSON.parse(Cookies.get('shippingAddress')): [],
        paymentMethod:  Cookies.get('paymentMethod') ? Cookies.get('paymentMethod'): null,
        
    },
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')): null,
    image:  null,
    payId: Cookies.get('payId') ? (Cookies.get('payId')): null,
}

function reducer(state, action){
    switch(action.type){
        case 'DARK_MODE':{
            //repurposed to add to cart
            const newItem = action.payload.order
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id )
            
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name?newItem : item)
            : [...state.cart.cartItems, newItem]
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return {...state, cart:{...state.cart, cartItems}}}
            // return {...state, darkMode:true}
        case 'LIGHT_MODE':
            return {...state, darkMode:false}
        case 'ADD_TO_CART':
            console.log("add to cart")
           
        case 'CART_REMOVE_ITEM': {
            console.log("removed")
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id)
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return {...state, cart:{...state.cart, cartItems}}}
        
        case 'USER_LOGIN': {
            return {...state, userInfo: action.payload}
        }

        case 'USER_LOGOUT':{
            return {...state, userInfo: null, cart:{cartItems: []}}
        }

        case 'SAVE_SHIPPING_ADDRESS':{
            return {...state, cart:{...state.cart, shippingAddress: action.payload}}
        }

        case 'SAVE_PAYMENT_METHOD':{
            return {...state, cart:{...state.cart, paymentMethod: action.payload}}
        }

        case 'CART_CLEAR':{
            return {...state, cart:{...state.cart, cartItems:[], shippingAddress:{}, paymentMethod:''}}
        }

        case 'PROFILE':{
            return {...state, image: action.payload}
        }

        case 'PAYID':{
            return{...state, payId: action.payload}
        }

        case 'DELETE_PAYID':{
            return{...state, payId: null}
        }
            
        default:{
            console.log("default")
            return state
        }
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initalState)
    const value = {state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}