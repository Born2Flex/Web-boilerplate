import {appContext} from "../../context/app-context.ts";
import {clearFilters} from "../operations/filtering.ts";
import {addTeachersOnPage} from "../main.ts";

const favoriteBtn = document.querySelector(".favorite-btn") as HTMLElement;

favoriteBtn.addEventListener('click', event => {
    const teacherInfoElem = (event.target as HTMLElement).closest<HTMLElement>('.main-teacher-info');
    const userID = teacherInfoElem?.getAttribute('data-user-id');
    if (userID) {
        const teacher = appContext.getTeacherById(userID);
        if (teacher) {
            teacher.favorite = !teacher.favorite;
        }
    }
    favoriteBtn.innerText = favoriteBtn.innerText === '☆' ? '★' : '☆';
    addTeachersOnPage();
    clearFilters();
});

