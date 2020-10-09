export function login() {
}
export function loginFromToken() {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        document.body.style.height = 'auto';
        return user;
    }
    return false;

}
export const user = {
    token: ''
};