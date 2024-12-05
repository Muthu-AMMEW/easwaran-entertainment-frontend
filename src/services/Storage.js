export const storeUserData = (data) => {
    localStorage.setItem('idToken', data)
}

export const storeAdminData = (data) => {
    let admin = data === "admin" ? true:false;
    localStorage.setItem('access', admin)
}

export const getUserData = () => {
    return localStorage.getItem('idToken');
}

export const getAdminData = () => {
    return localStorage.getItem('access');
}

export const removeUserData = () => {
    localStorage.removeItem('idToken')
    localStorage.removeItem('access')
}