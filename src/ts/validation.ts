// @ts-ignore
import {FormattedUser} from './interfaces';


export function validateUser(user: FormattedUser): boolean {
    let isValid = true;
    isValid &&= validateStringField(user.full_name);
    // isValid &&= validateStringField(user.gender);
    // isValid &&= validateStringField(user.note);
    isValid &&= validateStringField(user.state);
    isValid &&= validateStringField(user.city);
    isValid &&= validateStringField(user.country);

    isValid &&= validateNumField(user.age);
    isValid &&= validatePhoneNum(user.phone);
    isValid &&= validateEmail(user.email);

    return isValid;
}

function validateStringField(field: any): boolean {
    return typeof field === 'string' && field[0] === field[0].toUpperCase();
}

function validateNumField(field: any): boolean {
    return typeof field === 'number';
}

// TODO add phone num check
function validatePhoneNum(phoneNum: any): boolean {
    return typeof phoneNum === 'string'
}

function validateEmail(email: any): boolean {
    // validate @ separate name from domain part
    // validate domain part have at least 1 dot
    // no spaces on start or end
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailRegex.test(email);
}
