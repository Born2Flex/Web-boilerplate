import {FormattedUser, Gender} from './interfaces';
import {getPredicate} from "./search";

export interface FilterParams {
    country?: string;
    age?: number | string;
    gender?: Gender;
    favorite?: boolean;
}

export function filterUsers(users: FormattedUser[], filters: FilterParams): FormattedUser[] {
    return users.filter(user => applyFilters(user, filters));
}


function applyFilters(user: FormattedUser, filters: FilterParams): boolean {
    return Object.keys(filters).every(key => {
        if (key === 'age' && filters.age !== undefined) {
            return applyAgeFilter(user.age, filters.age);
        }
        return user[key] === filters[key];
    });
}

function applyAgeFilter(userAge: number | undefined, ageFilter: number | string): boolean {
    if (typeof ageFilter === 'number') {
        return userAge === ageFilter;
    }
    const ageComparisonRegex = /^(<=|>=|<|>|=)\s*(\d+)$/;
    const match = ageFilter.match(ageComparisonRegex);
    if (match) {
        const operator = match[1];
        const num = Number(match[2]);
        const predicate = getPredicate(operator);
        return predicate(userAge ?? 0, num);
    }
    return false;
}
