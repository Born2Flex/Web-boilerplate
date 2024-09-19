import {randomUserMock, additionalUsers} from './FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from './user-formatting';
import {validateUsers} from './validation';
import {FilterParams, filterUsers} from "./filtering";
import {sortUsers} from './sorting';

// task1
const formattedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), addFieldsToUsers(additionalUsers));

// console.log(formatUsersAndAddFields(randomUserMock))
// console.log(formattedUsers);
console.log(formattedUsers.length);

// task2
const validatedUsers= validateUsers(formattedUsers);
// console.log(formattedUsers)
console.log(validatedUsers.length)

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

// console.log(findUsersByParam(formattedUsers, '35'));

//task6
