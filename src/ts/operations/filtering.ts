import {FormattedUser, Gender} from '../utils/interfaces';

export interface FilterParams {
    region?: string;
    age?: number | string;
    gender?: Gender;
    favorite?: boolean;
    withPhoto?: boolean;
}

const regions: { [key: string]: string[] } = {
    'Europe': [
        "Ireland", "Finland", "Germany", "Switzerland", "Spain",
        "Norway", "Denmark", "France", "Netherlands"
    ],
    'Asia': [
        "Iran", "Turkey"
    ],
    'America': [
        "United States", "Canada"
    ]
};

export function filterUsers(users: FormattedUser[], filters: FilterParams): FormattedUser[] {
    return users.filter(user => applyFilters(user, filters));
}

function applyFilters(user: FormattedUser, filters: FilterParams): boolean {
    return Object.keys(filters).every(key => {
        if (key === 'age' && filters.age !== undefined) {
            return applyAgeFilter(user.age, filters.age);
        }
        if (key === 'withPhoto' && filters.withPhoto !== undefined) {
            return user.picture_large !== undefined && user.picture_large !== null;
        }
        if (key === 'region' && filters.region !== undefined && user.country !== undefined) {
            return regions[filters.region]?.includes(user.country) ?? false;
        }
        return (user as any)[key] === (filters as any)[key];
    });
}

function applyAgeFilter(userAge: number | undefined, ageFilter: number | string): boolean {
    if (typeof ageFilter === 'number') {
        return userAge === ageFilter;
    }
    const parts = ageFilter.split('-');
    const lower = Number(parts[0]);
    const upper = Number(parts[1]);
    if (userAge) {
        return userAge >= lower && userAge <= upper;
    }
    return true;
}
