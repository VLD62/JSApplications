export function saveUserInfo (userInfo) {
    sessionStorage.setItem('user', userInfo);
}

export function setHeader(ctx) {
    ctx.isAuth = sessionStorage.getItem('user') !== null;
    ctx.user = sessionStorage.getItem('user');
}