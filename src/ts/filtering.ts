import {FormattedUser, Gender} from './interfaces';

export interface FilterParams {
    country?: string;
    age?: number;
    gender?: Gender;
    favorite?: boolean;
}

export function filterUsers(users: FormattedUser[], filters: FilterParams): FormattedUser[] {
    return users.filter(user => applyFilters(user, filters));
}

function applyFilters(user: FormattedUser, filters: FilterParams): boolean {
    return Object.keys(filters).every(key => {
        return user[key] === filters[key];
    });
}

