import _ from 'lodash';
import { FormattedUser } from '../utils/interfaces';
import { getCountryCode } from 'countries-list';
import { CountryCode, isValidPhoneNumber } from "libphonenumber-js";

export function validateUsers(users: FormattedUser[]): FormattedUser[] {
    return _.filter(users, validateUser);
}

function validateUser(user: FormattedUser): boolean {
    return _.every([
        validateStringField(user.full_name),
        validateStringField(user.gender),
        validateStringField(user.note),
        validateStringField(user.state),
        validateStringField(user.city),
        validateStringField(user.country),
        validateNumField(user.age),
        validatePhoneNum(user.phone, user.country),
        validateEmail(user.email)
    ]);
}

function validateStringField(field: any): boolean {
    return _.isString(field) && _.startsWith(field, _.toUpper(field[0]));
}

function validateNumField(field: any): boolean {
    return _.isNumber(field);
}

function validatePhoneNum(phoneNum: any, country: any): boolean {
    if (_.isString(phoneNum) && _.isString(country)) {
        const countryCode = getCountryCode(country);
        if (!countryCode) {
            return false;
        }
        return isValidPhoneNumber(phoneNum, countryCode as CountryCode);
    }
    return false;
}

function validateEmail(email: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return _.isString(email) && emailRegex.test(email);
}
