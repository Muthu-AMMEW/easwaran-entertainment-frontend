import { getAdminData, getUserData, removeUserData } from "./Storage"


export const isAuthenticated = () => {
    return getUserData() != null ? true : false;
}

export const isAdmin = () => {
    return getAdminData();
}

export const logout = () => {
    removeUserData();
}