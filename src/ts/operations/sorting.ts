import {FormattedUser} from '../utils/interfaces';

type SortingField = 'full_name' | 'gender' | 'course' | 'age' | 'b_day' | 'country';
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
    return users.sort((a, b) => {
        const fieldA = a[field] as string;
        const fieldB = b[field] as string;
        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });
}

function sortUsersByNumField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return users.sort((a, b) => {
        const fieldA = a[field] as number;
        const fieldB = b[field] as number;
        return order === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });
}

function sortUsersByDateField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return users.sort((a, b) => {
        const fieldA = new Date(a[field] as string);
        const fieldB = new Date(b[field] as string);
        return order === 'asc' ? fieldB.getTime() - fieldA.getTime() : fieldA.getTime() - fieldB.getTime();
    });
}
