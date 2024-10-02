import {additionalUsers, randomUserMock} from '../FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from "../utils/user-formatting";
import {validateUsers} from "../operations/validation";
import {FormattedUser} from "../utils/interfaces";

export const mergedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), addFieldsToUsers(additionalUsers));
export let validatedUsers = validateUsers(mergedUsers);

export const baseUrl = 'https://randomuser.me/api/';
const jsonServerUrl = "http://localhost:3000/teachers"

// const fetchedUsers = await fetchUsers();
// console.log(fetchedUsers);

export async function fetchTeachers(num: number) {
    try {
        const response = await fetch(baseUrl + `?results=${num}`);
        const responseJson = await response.json();
        return responseJson.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function addTeacherOnServer(teacher: FormattedUser) {
    try {
        await fetch(jsonServerUrl, {
           method: 'POST',
           body: JSON.stringify(teacher)
        });
        console.log('Teacher was successfully sent on JSON-Server');
    } catch (error) {
        console.log(`Unable to process POST request: ${error}`);
    }
}
