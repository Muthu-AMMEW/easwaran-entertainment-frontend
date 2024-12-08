import axios from "axios";
import { getUserData } from './Storage';

const FIRE_BASE_URL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyA1vaXYivjKNtZGfaMNY1zzJbg6QT5L7mI";
const REGISTER_URL =  FIRE_BASE_URL+`/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL =  FIRE_BASE_URL+`/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL =  FIRE_BASE_URL+`/accounts:lookup?key=${API_KEY}`;
const CHANGE_PASSWORD_URL = FIRE_BASE_URL+`/accounts:update?key=${API_KEY}`;
const FORGET_PASSWORD_URL = FIRE_BASE_URL+`/accounts:sendOobCode?key=${API_KEY}`;

const M_BASE_URL = process.env.REACT_APP_API_URL;
const M_REGISTER_URL = M_BASE_URL + `/signup`;
const M_USER_DETAILS_URL = M_BASE_URL + '/userdetails';
const ORDER_DETAILS_URL = M_BASE_URL + '/orderdetails';
const UPDATE_PROFILE_URL = M_BASE_URL + '/user/updateprofile';
const PRODUCT_DETAILS_URL = M_BASE_URL + '/productdetails/';
const CREATE_ORDER_URL = M_BASE_URL + '/createorder';

const NEW_PRODUCT_URL = M_BASE_URL + '/admin/newproduct';
const UPDATE_PRODUCT_URL = M_BASE_URL + '/admin/updateproduct/';
const GET_PRODUCTS_URL = M_BASE_URL + '/products?';
const DELETE_PRODUCT_URL = M_BASE_URL +'/admin/deleteproduct/';
const M_ALL_USER_DETAILS_URL = M_BASE_URL + '/admin/alluserdetails';
const ALL_ORDER_DETAILS_URL = M_BASE_URL + '/admin/allorderdetails';
const ORDER_ID_DETAILS_URL = M_BASE_URL + '/admin/orderiddetails/';



export const RegisterApi = (inputs) => {
    let data = { email: inputs.email, password: inputs.pwd }
    return axios.post(REGISTER_URL, data)
}
export const M_RegisterApi = (inputs, fireRegister) => {
    let data = { fullName: inputs.fullName, email: inputs.email, pno: inputs.pno, address: inputs.address, localId: fireRegister.data.localId }
    return axios.post(M_REGISTER_URL, data)
}

export const LoginApi = (inputs) => {
    let data = { email: inputs.email, password: inputs.pwd }
    return axios.post(LOGIN_URL, data)
}

export const UserDetailsApi = () => {
    let data = { idToken: getUserData() }
    return axios.post(USER_DETAILS_URL, data)
}
export const M_UserDetailsApi = (test) => {
    let data = { localId: test }
    return axios.post(M_USER_DETAILS_URL, data)
}

export const M_AllUserDetailsApi = () => {
    return axios.get(M_ALL_USER_DETAILS_URL)
}

export const CreateOrderApi = (data) => {
    return axios.post(CREATE_ORDER_URL, data)
}

export const OrderDetailsApi = (temp) => {
    let data = { localId: temp}
    return axios.post(ORDER_DETAILS_URL, data)
}

export const AllOrderDetailsApi = () => {
    return axios.get(ALL_ORDER_DETAILS_URL)
}


export const ChangePasswordApi = (inputs) => {
    let data = { idToken:inputs.idToken, password:inputs.pwd, returnSecureToken: true }
    return axios.post(CHANGE_PASSWORD_URL, data)
}

export const ForgetPasswordApi = (inputs) => {
    let data = {requestType:"PASSWORD_RESET", email: inputs.email}
    return axios.post(FORGET_PASSWORD_URL, data)
}

export const UpdateProfileApi = (inputs) => {
    let data = { fullName: inputs.fullName, pno: inputs.pno, address: inputs.address, localId: inputs.localId, profile: inputs.profile }
    return axios.put(UPDATE_PROFILE_URL, data)
}

export const ProductDetailsApi =(searchParams) => {
    return axios.get(PRODUCT_DETAILS_URL+searchParams)
}

export const GetProductsApi =(searchParams) => {
    return axios.get(GET_PRODUCTS_URL+searchParams)
}

export const NewProductApi = (inputs) => {
    let data = { name: inputs.name, price: inputs.price, description: inputs.description, ratings: inputs.ratings, images: [{image: inputs.images}], category: inputs.category, seller: inputs.seller, stock: inputs.stock}
    return axios.post(NEW_PRODUCT_URL, data)
}

export const UpdateProductApi = (inputs, id) => {
    let data = { name: inputs.name, price: inputs.price, description: inputs.description, ratings: inputs.ratings, images: [{image: inputs.images}], category: inputs.category, seller: inputs.seller, stock: inputs.stock}
    return axios.put(UPDATE_PRODUCT_URL+id, data)
}

export const OrderIdDetailsApi =(searchParams) => {
    return axios.get(ORDER_ID_DETAILS_URL+searchParams)
}

export const DeleteProductApi =(id)=>{
    return axios.delete(DELETE_PRODUCT_URL+id)
}