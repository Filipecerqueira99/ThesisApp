function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    let user = JSON.parse(localStorage.getItem('user'));
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (user !== null && accessToken !== null) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}

export default authHeader