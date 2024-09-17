import {randomUserMock, additionalUsers} from './FE4U-Lab2-mock';
// @ts-ignore
import {formatUsersAndAddFields, mergeUsers} from './user-formatting';
// @ts-ignore
import {validateUser} from './validation';
// @ts-ignore
import {FilterParams, filterUsers} from "./filtering";
// @ts-ignore
import {sortUsers} from './sorting';
// @ts-ignore
import {findUserByParam} from './search';
import {FormattedUser} from './interfaces';

// task1
const formattedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), additionalUsers as FormattedUser[]);
// console.log(formattedUsers);
// console.log(formattedUsers.length);

// task2
const validatedUsers= formattedUsers.filter((user, i, self) => validateUser(user));
// console.log(formattedUsers)
// console.log(validatedUsers.length)

// task3
const filters: FilterParams = {
    country: 'Germany',
    age: 35
};

const filteredUsers = filterUsers(validatedUsers, filters);
// console.log(filteredUsers)
// console.log(filteredUsers.length)

//task4
const sortedUsers = sortUsers(formattedUsers, 'b_day', 'desc');

// console.log(sortedUsers);
// sortedUsers.forEach(user => console.log(user.b_day));

//task5

console.log(findUserByParam(formattedUsers, '35'));

//task6
