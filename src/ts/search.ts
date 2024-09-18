import {FormattedUser} from './interfaces';

// TODO add search params > < >= <= =, do I need to set field param ?
export function findUserByParam(users: FormattedUser[], param: any): FormattedUser[] {
    return users.filter(user =>
        user.full_name.includes(param) ||
        user.note?.includes(param) ||
        user.age === Number(param)
    );
}
