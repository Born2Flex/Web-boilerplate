import {FormattedUser} from './interfaces';
import {findUsersByParam} from "./search";

export function calcPercent(users: FormattedUser[], param: any) {
    return (findUsersByParam(users, param).length / users.length) * 100;
}
