import axios from "axios";

// Email Validation
export async function emailVali(x) {
    // Check format
    const emailVali = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let res = x.match(emailVali);
    if (!res) return ('Email not valid');

    // Check db if email is used
    //res = await axios.get('accounts/checkEmail');
    //if (res.emailTaken) return ('Account already exists with this email');

    return null;
}

// Password Validation
export function passVali(x) {
    if (x.length < 8 || x.length > 16) return ('Password must be between 8 and 16 charaters');

    return null;
}

// Password Match
export function passMatch(x, y) {
    if (x === y) return ('Matched!');

    return null;
}

export async function userVali(x) {

    return null;
}