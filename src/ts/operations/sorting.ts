import {FormattedUser} from '../utils/interfaces';
import _ from 'lodash';

export type SortingField = 'full_name' | 'gender' | 'course' | 'age' | 'b_day' | 'country';
export type Order = 'asc' | 'desc';

export function sortUsers(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    if (isStringField(field)) {
        return sortUsersByStringField(users, field, order);
    } else if (isNumField(field)) {
        return sortUsersByNumField(users, field, order);
    } else {
        return sortUsersByDateField(users, field, order);
    }
}

function isStringField(field: string): boolean {
    return field === 'full_name' || field === 'country' || field === 'course' || field === 'gender';
}

function isNumField(field: string): boolean {
    return field === 'age';
}

function sortUsersByStringField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return _.orderBy(users, [user => _.toLower(user[field] as string)], [order]);
}

function sortUsersByNumField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return _.orderBy(users, [field], [order]);
}

function sortUsersByDateField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return _.orderBy(users, [user => new Date(user[field] as string)], [order]);
}
