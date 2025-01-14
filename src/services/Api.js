import axios from "axios";
import { getUserData } from './Storage';

const FIRE_BASE_URL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = process.env.REACT_APP_FIRE_BASE_API_KEY;
const REGISTER_URL =  FIRE_BASE_URL+`/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL =  FIRE_BASE_URL+`/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL =  FIRE_BASE_URL+`/accounts:lookup?key=${API_KEY}`;
const CHANGE_PASSWORD_URL = FIRE_BASE_URL+`/accounts:update?key=${API_KEY}`;
const FORGET_PASSWORD_URL = FIRE_BASE_URL+`/accounts:sendOobCode?key=${API_KEY}`;

const M_BASE_URL = process.env.REACT_APP_API_URL;
const M_REGISTER_URL = M_BASE_URL + `/signup`;
const QUICK_START_URL = M_BASE_URL + '/quickstart';
const M_USER_DETAILS_URL = M_BASE_URL + '/userdetails';
const UPDATE_PROFILE_URL = M_BASE_URL + '/user/updateprofile';
const VIDEO_DETAILS_URL = M_BASE_URL + '/videodetails/';
const CREATE_CONTACT_URL = M_BASE_URL + '/createcontact';

const NEW_VIDEO_URL = M_BASE_URL + '/admin/newvideo';
const UPDATE_VIDEO_URL = M_BASE_URL + '/admin/updatevideo/';
const GET_VIDEOS_URL = M_BASE_URL + '/videos?';
const DELETE_VIDEO_URL = M_BASE_URL +'/admin/deletevideo/';
const M_ALL_USER_DETAILS_URL = M_BASE_URL + '/admin/alluserdetails';
const ALL_CONTACT_DETAILS_URL = M_BASE_URL + '/admin/allcontactdetails';
const CONTACT_DETAILS_URL = M_BASE_URL + '/admin/contactdetails/';
const CONTACT_ID_DETAILS_URL = M_BASE_URL + '/admin/contactiddetails/';



export const RegisterApi = (inputs) => {
    let data = { email: inputs.email, password: inputs.pwd }
    return axios.post(REGISTER_URL, data)
}
export const M_RegisterApi = (inputs, fireRegister) => {
    let data = { fullName: inputs.fullName, email: inputs.email, pno: inputs.pno, address: inputs.address, localId: fireRegister.data.localId }
    return axios.post(M_REGISTER_URL, data)
}

export const QuickStartApi = () => {
    return axios.post(QUICK_START_URL)
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

export const CreateContactApi = (data) => {
    return axios.post(CREATE_CONTACT_URL, data)
}

export const AllContactDetailsApi = () => {
    return axios.get(ALL_CONTACT_DETAILS_URL)
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

export const VideoDetailsApi =(searchParams) => {
    return axios.get(VIDEO_DETAILS_URL+searchParams)
}

export const GetVideosApi =(searchParams) => {
    return axios.get(GET_VIDEOS_URL+searchParams)
}

export const NewVideoApi = (inputs) => {
    let data = { sno: inputs.sno, title: inputs.title, videoLink: inputs.videos, description: inputs.description, keywords: inputs.keywords, notes: inputs.notes}
    return axios.post(NEW_VIDEO_URL, data)
}

export const UpdateVideoApi = (inputs, id) => {
    let data = { sno: inputs.sno, title: inputs.title, videoLink: inputs.videos, description: inputs.description, keywords: inputs.keywords, notes: inputs.notes}
    return axios.put(UPDATE_VIDEO_URL+id, data)
}

export const ContactIdDetailsApi =(searchParams) => {
    return axios.get(CONTACT_ID_DETAILS_URL+searchParams)
}

export const ContactDetailsApi = (searchParams) => {
    return axios.get(CONTACT_DETAILS_URL+searchParams)
}

export const DeleteVideoApi =(id)=>{
    return axios.delete(DELETE_VIDEO_URL+id)
}