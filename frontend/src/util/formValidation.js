import axios from "axios";

// Email Validation
export async function emailVali(x) {
    // Check if entered
    if (isEmpty(x)) return ("Field is required");

    // Check format
    const emailVali = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let res = x.match(emailVali);
    if (!res) return ('Email not valid');

    // Check db if email is used
    res = axios.post('/accounts/checkEmail', { email: x });
    if (res.emailTaken) return ('Account already exists with this email');

    return null;
}

// Password Validation
export function passVali(x) {
    // Check if entered
    if (isEmpty(x)) return ("Field is required");

    // Check length
    if (x.length < 8 || x.length > 16) return ('Password must be between 8 and 16 charaters');

    return null;
}

// Password Match
export function passMatch(x, y) {
    // Check if entered
    if (isEmpty(x)) return ("Field is required");

    // Check if pass's match
    if (x != y) return ('Passwords do not match!');

    return null;
}

export async function userVali(x) {
    // Check if entered
    if (isEmpty(x)) return ("Field is required");

    // Check DB for username
    const res = axios.post('/accounts/checkUserName', { userName: x });
    if (res.nameTaken) return ('User name taken');

    return null;
}

export function dobVali(x) {
    // Check if entered
    if (isEmpty(x)) return ("Field is required");

    return null;
}

function isEmpty(str) {
    if (str === "") return true;
    return false;
}