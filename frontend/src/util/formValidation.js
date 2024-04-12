import axios from "axios";

// Email Validation
export async function emailVali(x) {
    // Check if empty
    if (isEmpty(x)) return ("Field is required");

    // Check format
    const emailVali = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let res = x.match(emailVali);
    if (!res) return ('Email not valid');

    // Check db if email is used
    res = await axios.post('/accounts/checkEmail', { email: x });
    if (res.data.emailTaken) return ('Account already exists with this email');

    return null;
}

// Password Validation
export function passVali(x) {
    // Check if empty
    if (isEmpty(x)) return ("Field is required");

    // Check length
    if (x.length < 8 || x.length > 16) return ('Password must be between 8 and 16 charaters');

    return null;
}

// Password Match
export function passMatch(x, y) {
    // Check if empty
    if (isEmpty(x)) return ("Field is required");

    // Check if pass's match
    if (x != y) return ('Passwords do not match!');

    return null;
}

// User Exists Check
export async function userVali(x) {
    // Check if empty
    if (isEmpty(x)) return ("Field is required");

    // Check DB for username
    const res = await axios.post('/accounts/checkUserName', { userName: x });
    if (res.data.nameTaken) return ('User name taken');

    return null;
}

// Dob Check
export function dobVali(x) {
    // Check if entered
    const test = !isNaN(new Date(x));
    if (!test) return ("Field is required");

    // Age Check 
    if (getAge(x) < 17) return ("Must be 18 or older to create an account");

    return null;
}

//////////////////////////////// Helper Functions ////////////////////////
function isEmpty(str) {
    if (str === "") return true;
    return false;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}