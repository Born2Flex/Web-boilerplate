import {additionalUsers, randomUserMock} from './FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from "./utils/user-formatting";
import {validateUsers} from "./utils/validation";

export const mergedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), addFieldsToUsers(additionalUsers));
export let validatedUsers = validateUsers(mergedUsers);

export const baseUrl = 'https://randomuser.me/api/';

// const fetchedUsers = await fetchUsers();
// console.log(fetchedUsers);

export async function fetchUsers() {
    try {
        const response = await fetch(baseUrl + '?results=50');
        const responseJson = await response.json();
        return responseJson.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}
