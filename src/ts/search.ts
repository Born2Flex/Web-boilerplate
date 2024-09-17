// @ts-ignore
import {FormattedUser} from './interfaces';

export function findUserByParam(users: FormattedUser[], param: any): FormattedUser | null {
    return users.find(user =>
        user.full_name.includes(param) ||
        user.note?.includes(param) ||
        user.age === Number(param)
    ) ?? null;
}
