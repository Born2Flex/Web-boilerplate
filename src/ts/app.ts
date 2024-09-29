import './utils/scroll';
import '../css/app.css';
import './teacher-form'
import {addTeachersOnPage} from "./task1";
import './filtering'
import './search'
import './form-submit'
import {fetchUsers} from "./data";
import {appContext} from "./context/app-context";
import {formatUsersAndAddFields} from "./utils/user-formatting";
import {validateUsers} from "./utils/validation";


document.addEventListener('DOMContentLoaded', async () =>  {
    const fetchedUsers = await fetchUsers();
    console.log(`Received response: ${JSON.stringify(fetchedUsers)}`);
    console.log(fetchedUsers);
    console.log(formatUsersAndAddFields(fetchedUsers));
    console.log(validateUsers(formatUsersAndAddFields(fetchedUsers)));
    console.log(appContext.getTeachers());
    appContext.setTeachers(validateUsers(formatUsersAndAddFields(fetchedUsers)));
    console.log(appContext.getTeachers());
    addTeachersOnPage(appContext.getTeachers());
})
