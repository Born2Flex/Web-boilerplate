import {randomUserMock, additionalUsers} from '../FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from './user-formatting';
import {validateUsers} from './validation';
import {FilterParams, filterUsers} from "./filtering";
import {sortUsers} from './sorting';
import {writeToFile} from './utils'
import {findUsersByParam} from "./search";
import {calcPercent} from "./statistics";

// task1

const formattedUsers = formatUsersAndAddFields(randomUserMock);
writeToFile(formattedUsers, './files/formatted.json');
const mergedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), addFieldsToUsers(additionalUsers));
writeToFile(mergedUsers, './files/merged.json');
console.log('TASK 1')
console.log(`Num of formatted users: ${formattedUsers.length}`);
console.log(`Num of additional users: ${additionalUsers.length}`);
console.log(`Num of merged users: ${mergedUsers.length} \n`);

// task2

const validatedUsers= validateUsers(mergedUsers);
writeToFile(validatedUsers, './files/validated.json')
console.log('TASK 2')
console.log(`Num of validated users: ${validatedUsers.length}\n`);

// task3

const filters: FilterParams = {
    // country: 'France',
    gender: "Male",
    // age: ">= 35",
    // age: "55",
    // favorite: false,
};

const filteredUsers = filterUsers(validatedUsers, filters);
writeToFile(filteredUsers, './files/filtered.json')
console.log('TASK 3')
console.log(`Num of filtered users: ${filteredUsers.length}\n`);

//task4

const sortedUsers = sortUsers(validatedUsers, 'b_day', 'desc');
writeToFile(sortedUsers, './files/sorted.json')
console.log('TASK 4')
console.log(`Users sorted! \n`);

// console.log(sortedUsers);
// sortedUsers.forEach(user => console.log(user.b_day));

//task5

const searchResult = findUsersByParam(validatedUsers, '<= 30');
// const searchResult = findUsersByParam(validatedUsers, 'No');
// const searchResult = findUsersByParam(validatedUsers, 'Claude');
// const searchResult = findUsersByParam(validatedUsers, '< 55');
// const searchResult = findUsersByParam(validatedUsers, 'Wood');
// const searchResult = findUsersByParam(validatedUsers, 'Mat');
writeToFile(searchResult, './files/found.json');
console.log('TASK 5');
console.log(`Users found: ${searchResult.length}\n`);

//task6

const statistics = calcPercent(validatedUsers, '<= 30');
// const statistics = calcPercent(validatedUsers, 'No');
// const statistics = calcPercent(validatedUsers, '<= 25');
// const statistics = calcPercent(validatedUsers, '< 55');
// const statistics = calcPercent(validatedUsers, 'Wood');
// const statistics = calcPercent(validatedUsers, 'Mat');
writeToFile(statistics, './files/statistics.json');
console.log('TASK 6');
console.log(`Percent of users: ${statistics}\n`);
