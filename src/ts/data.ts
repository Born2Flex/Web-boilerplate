import {additionalUsers, randomUserMock} from './FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from "./utils/user-formatting";
import {validateUsers} from "./utils/validation";

export const mergedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), addFieldsToUsers(additionalUsers));
export const validatedUsers = validateUsers(mergedUsers);
