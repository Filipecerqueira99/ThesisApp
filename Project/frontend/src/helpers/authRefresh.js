function authHeaderRefresh() {
    // return auth header with jwt if user is logged in and request is to the api url
    let user = JSON.parse(localStorage.getItem('user'));
    let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    if (user !== null && refreshToken !== null) {
        return { Authorization: `Bearer ${refreshToken}` };
    } else {
        return {};
    }
}

export default authHeaderRefresh