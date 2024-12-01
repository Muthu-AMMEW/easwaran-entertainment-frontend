import axios from "axios";
import { getUserData } from './Storage';

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyA1vaXYivjKNtZGfaMNY1zzJbg6QT5L7mI";
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;
const CHANGE_PASSWORD_URL =`/accounts:update?key=${API_KEY}`;
const FORGET_PASSWORD_URL =`/accounts:sendOobCode?key=${API_KEY}`;
const CHANGE_PHOTO_URL =``;

const M_BASE_URL = process.env.REACT_APP_API_URL;
const M_REGISTER_URL = M_BASE_URL + `/signup`;
// const M_LOGIN_URL = M_BASE_URL+`/login`;
const M_USER_DETAILS_URL = M_BASE_URL + '/userdetails';
const ORDER_DETIALS_URL = M_BASE_URL + '/order';


export const RegisterApi = (inputs) => {
    let data = { displayName: inputs.fullName, email: inputs.email, password: inputs.pwd }
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

export const OrderDetailsApi = (temp) => {
    let data = { localId: temp}
    return axios.post(ORDER_DETIALS_URL, data)
}

export const ChangePasswordApi = (inputs) => {
    let data = { idToken:inputs.idToken, password:inputs.pwd, returnSecureToken: true }
    return axios.post(CHANGE_PASSWORD_URL, data)
}

export const ForgetPasswordApi = (inputs) => {
    let data = {requestType:"PASSWORD_RESET", email: inputs.email}
    return axios.post(FORGET_PASSWORD_URL, data)
}