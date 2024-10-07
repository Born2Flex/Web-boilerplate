import './utils/scroll';
import '../css/app.css';
import './page/forms/teacher-form'
import {addTeachersOnPage} from "./page/main.ts";
import './page/operations/filtering'
import './page/operations/search'
import './page/forms/form-submit'
import './page/popup/fav-button'
import './page/popup/teacher-info-popup'
import './page/pagination/load-more-btn'
import './page/chart/section-switch'
import './page/chart/chart-select'
import {fetchTeachers} from "./data/data";
import {appContext} from "./context/app-context";
import {formatUsersAndAddFields} from "./utils/user-formatting.ts";
import {validateUsers} from "./operations/validation.ts";
import {FormattedUser} from "./utils/interfaces";
import {preparePagination} from "./page/pagination/pagination";
import {setUpAgeChart} from "./page/chart/chart";

const minNumOfTeachers = 50;

document.addEventListener('DOMContentLoaded', async () =>  {
    let validatedTeachers: FormattedUser[] = [];
    while (validatedTeachers.length <= minNumOfTeachers) {
        const teachers = await fetchTeachers(minNumOfTeachers);
        if (teachers === undefined) {
            await new Promise(r => setTimeout(r, 500));
            continue;
        }
        console.log(validateUsers(formatUsersAndAddFields(teachers)));
        validatedTeachers = validatedTeachers.concat(validateUsers(formatUsersAndAddFields(teachers)));
    }
    console.log(appContext.getTeachers());

    appContext.setTeachers(validatedTeachers.slice(0,minNumOfTeachers));

    console.log(appContext.getTeachers());
    preparePagination();
    addTeachersOnPage();
    setUpAgeChart();
})
