import {FormattedUser} from './interfaces';

export function findUsersByParam(users: FormattedUser[], param: any): FormattedUser[] {
    const ageComparisonRegex = /^(<=|>=|<|>|=)\s*(\d+)$/;
    const match = param.match(ageComparisonRegex);
    if (match) {
        return searchByAge(users, match);
    }
    return users.filter(user =>
        user.full_name.includes(param) ||
        user.note?.includes(param) ||
        user.age === Number(param)
    );
}

function searchByAge(users: FormattedUser[], match: string[]) {
    const operator = match[1];
    const num = Number(match[2]);
    const predicate = getPredicate(operator);
    return users.filter(user => predicate(user.age ?? 0, num));
}

function getPredicate(operator: string): (a: number, b: number) => boolean {
    switch (operator) {
        case '>': return (a, b) => a > b;
        case '>=': return (a, b) => a >= b;
        case '<': return (a, b) => a < b;
        case '<=': return (a, b) => a <= b;
        case '=': return (a, b) => a === b;
        default: return () => false;
    }
}
