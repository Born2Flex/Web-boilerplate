import {FormattedUser} from '../utils/interfaces';
import {getCountryCode} from 'countries-list'
import {CountryCode, isValidPhoneNumber} from "libphonenumber-js";

export function validateUsers(users: FormattedUser[]) {
    return users.filter(user => validateUser(user));
}

function validateUser(user: FormattedUser): boolean {
    let isValid = true;
    isValid &&= validateStringField(user.full_name);
    isValid &&= validateStringField(user.gender);
    isValid &&= validateStringField(user.note);
    isValid &&= validateStringField(user.state);
    isValid &&= validateStringField(user.city);
    isValid &&= validateStringField(user.country);

    isValid &&= validateNumField(user.age);
    isValid &&= validatePhoneNum(user.phone, user.country);
    isValid &&= validateEmail(user.email);
    return isValid;
}

function validateStringField(field: any): boolean {
    return typeof field === 'string' && field[0] === field[0].toLocaleUpperCase();
}

function validateNumField(field: any): boolean {
    return typeof field === 'number';
}

function validatePhoneNum(phoneNum: any, country: any): boolean {
    if (typeof phoneNum === 'string' && typeof country === 'string') {
        const countryCode = getCountryCode(country);
        if (!countryCode) {
            return false;
        }
        return isValidPhoneNumber(phoneNum, countryCode as CountryCode);
    }
    return false;
}

function validateEmail(email: any): boolean {
    // validate @ separate name from domain part
    // validate domain part have at least 1 dot
    // no spaces on start or end
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailRegex.test(email);
}
