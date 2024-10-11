import {FormattedUser, Gender} from '../utils/interfaces';
import _ from 'lodash';

export interface FilterParams {
    region?: string;
    age?: number | string;
    gender?: Gender;
    favorite?: boolean;
    withPhoto?: boolean;
}

export const regions: { [key: string]: string[] } = {
    'Europe': [
        "Ireland", "Finland", "Germany", "Switzerland", "Spain",
        "Norway", "Denmark", "France", "Netherlands", "Italy",
        "Belgium", "Austria", "Portugal", "Sweden", "Poland", "United Kingdom", "Serbia"
    ],
    'Asia': [
        "Iran", "Turkey", "China", "India", "Japan",
        "South Korea", "Indonesia", "Malaysia", "Thailand", "Vietnam", "New Zealand"
    ],
    'America': [
        "United States", "Canada", "Brazil", "Mexico",
        "Argentina", "Colombia", "Chile", "Peru", "Venezuela", "Uruguay"
    ]
};

export function filterUsers(users: FormattedUser[], filters: FilterParams): FormattedUser[] {
    return _.filter(users, user => applyFilters(user, filters));
}

function applyFilters(user: FormattedUser, filters: FilterParams): boolean {
    return _.every(filters, (value, key) => {
        if (key === 'age' && value !== undefined) {
            return applyAgeFilter(user.age, value);
        }
        if (key === 'withPhoto' && value !== undefined) {
            return Boolean(user.picture_large);
        }
        if (key === 'region' && value !== undefined && user.country !== undefined) {
            return _.includes(regions[value], user.country);
        }
        return _.isEqual((user as any)[key], value);
    });
}

function applyAgeFilter(userAge: number | undefined, ageFilter: number | string): boolean {
    if (_.isNumber(ageFilter)) {
        return userAge === ageFilter;
    }
    if (typeof ageFilter !== "number") {
        const parts = ageFilter.split('-').map(_.toNumber) as number[];
        if (userAge) {
            return userAge >= parts[0] && userAge <= parts[1];
        }
    }
    return true;
}
