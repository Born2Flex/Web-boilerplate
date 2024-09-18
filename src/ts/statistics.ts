import {FormattedUser} from './interfaces';

function calcPercent(users: FormattedUser[], predicate: (user: FormattedUser) => Boolean) {
    const result = users.filter(user => predicate(user));
    return (result.length / users.length) * 100;
}
