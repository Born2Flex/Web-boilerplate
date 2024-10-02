import {fetchTeachers} from "../../data/data";
import {recordsPerPage} from "./pagination";
import {FormattedUser} from "../../utils/interfaces";
import {validateUsers} from "../../operations/validation";
import {formatUsersAndAddFields} from "../../utils/user-formatting";
import {appContext} from "../../context/app-context";
import {addTeachersOnPage} from "../main";
import {clearSorting} from "../operations/sorting";
import {clearFilters} from "../operations/filtering";
import {clearSearchInput} from "../operations/search";


document.querySelector("#load-more-btn").addEventListener('click', async () => {
    console.log("Load more event");
    let validatedTeachers: FormattedUser[] = [];
    while (validatedTeachers.length <= recordsPerPage) {
        const teachers = await fetchTeachers(recordsPerPage);
        if (teachers === undefined) {
            await new Promise(r => setTimeout(r, 500));
            continue;
        }
        console.log(validateUsers(formatUsersAndAddFields(teachers)));
        validatedTeachers = validatedTeachers.concat(validateUsers(formatUsersAndAddFields(teachers)));
    }
    clearFilters();
    clearSorting();
    clearSearchInput();
    appContext.addTeachersList(validatedTeachers.slice(0, recordsPerPage));
    addTeachersOnPage();
});
