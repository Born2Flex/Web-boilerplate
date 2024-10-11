import _ from 'lodash';
import { FormattedUser } from '../utils/interfaces';

export function findUsersByParam(users: FormattedUser[], param: any): FormattedUser[] {
    const ageComparisonRegex = /^(<=|>=|<|>|=)\s*(\d+)$/;
    const match = param.match(ageComparisonRegex);
    if (match) {
        return findByAge(users, match);
    }
    return _.filter(users, user =>
        _.includes(_.toLower(user.full_name), _.toLower(param)) ||
        _.includes(_.toLower(user.note ?? ''), _.toLower(param)) ||
        user.age === _.toNumber(param)
    );
}

function findByAge(users: FormattedUser[], match: RegExpMatchArray): FormattedUser[] {
    const operator = match[1];
    const num = _.toNumber(match[2]);
    const predicate = getPredicate(operator);
    return _.filter(users, user => predicate(user.age ?? 0, num));
}

export function getPredicate(operator: string): (a: number, b: number) => boolean {
    const predicates: { [key: string]: (a: number, b: number) => boolean } = {
        '>': _.gt,
        '>=': _.gte,
        '<': _.lt,
        '<=': _.lte,
        '=': _.eq
    };
    return predicates[operator] || (() => false);
}
