// @ts-ignore
import {formatUsersAndAddFields, mergeUsers} from './user-formatting';
import {randomUserMock, additionalUsers} from './FE4U-Lab2-mock';
import {FormattedUser} from "./interfaces";

// task1
console.log(mergeUsers(formatUsersAndAddFields(randomUserMock), additionalUsers as FormattedUser[]));
